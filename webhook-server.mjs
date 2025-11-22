#!/usr/bin/env node

/**
 * Simple Webhook Server for Cron-Job.org Integration
 * This runs a lightweight HTTP server that triggers the pipeline when pinged
 * 
 * Usage:
 *   node webhook-server.mjs
 * 
 * Then register the webhook URL in cron-job.org
 */

import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key-here';
const LOG_DIR = './logs';

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Track if pipeline is currently running
let isRunning = false;
let lastRunTime = null;

/**
 * Log messages to file and console
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // Also write to file
  const logFile = path.join(LOG_DIR, `webhook-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logMessage + '\n', { encoding: 'utf-8' });
}

/**
 * Run the complete pipeline
 */
async function runPipeline() {
  return new Promise((resolve, reject) => {
    log('🚀 Starting pipeline execution...');
    
    const process = spawn('node', ['complete_phase.mjs'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: 'production'
      },
      stdio: 'pipe'
    });

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      log(text.trimEnd());
    });

    process.stderr.on('data', (data) => {
      const text = data.toString();
      stderr += text;
      log(`ERROR: ${text.trimEnd()}`);
    });

    process.on('close', (code) => {
      log(`✅ Pipeline completed with exit code: ${code}`);
      
      if (code === 0) {
        resolve({ success: true, stdout });
      } else {
        reject({ success: false, code, stderr });
      }
    });

    process.on('error', (error) => {
      log(`❌ Failed to start pipeline: ${error.message}`);
      reject(error);
    });

    // Timeout after 60 minutes
    setTimeout(() => {
      log('⏱️  Pipeline timeout (60 minutes), killing process...');
      process.kill();
      reject(new Error('Pipeline timeout'));
    }, 60 * 60 * 1000);
  });
}

/**
 * Create HTTP server
 */
const server = http.createServer(async (req, res) => {
  log(`📨 Incoming request: ${req.method} ${req.url}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      running: isRunning,
      lastRun: lastRunTime,
      uptime: process.uptime()
    }));
    return;
  }

  // Webhook trigger endpoint
  if (req.url === '/trigger' && (req.method === 'GET' || req.method === 'POST')) {
    if (isRunning) {
      log('⚠️  Pipeline already running, rejecting new trigger');
      res.writeHead(409); // Conflict
      res.end(JSON.stringify({
        success: false,
        message: 'Pipeline already running',
        lastRun: lastRunTime
      }));
      return;
    }

    // Check secret if provided
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const secret = query.get('secret');
    
    if (secret && secret !== WEBHOOK_SECRET) {
      log('🚫 Invalid webhook secret');
      res.writeHead(401); // Unauthorized
      res.end(JSON.stringify({ success: false, message: 'Invalid secret' }));
      return;
    }

    isRunning = true;
    lastRunTime = new Date().toISOString();
    
    log('✅ Pipeline trigger accepted, starting execution...');
    res.writeHead(202); // Accepted
    res.end(JSON.stringify({
      success: true,
      message: 'Pipeline started',
      startTime: lastRunTime
    }));

    // Run pipeline in background (don't await)
    runPipeline()
      .then(() => {
        log('✅ Pipeline execution completed successfully');
      })
      .catch((error) => {
        log(`❌ Pipeline execution failed: ${error.message}`);
      })
      .finally(() => {
        isRunning = false;
      });

    return;
  }

  // Status endpoint
  if (req.url === '/status') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: isRunning ? 'running' : 'idle',
      lastRun: lastRunTime,
      uptime: process.uptime(),
      logs: 'Available at /logs'
    }));
    return;
  }

  // Logs endpoint
  if (req.url === '/logs') {
    try {
      const logFiles = fs.readdirSync(LOG_DIR);
      const latestLog = logFiles.sort().reverse()[0];
      
      if (latestLog) {
        const logContent = fs.readFileSync(path.join(LOG_DIR, latestLog), 'utf-8');
        res.writeHead(200);
        res.end(logContent);
      } else {
        res.writeHead(200);
        res.end('No logs yet');
      }
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    message: 'Not found',
    endpoints: {
      'GET /health': 'Health check',
      'GET /trigger': 'Trigger pipeline',
      'GET /status': 'Get current status',
      'GET /logs': 'View logs'
    }
  }));
});

/**
 * Start server
 */
server.listen(PORT, '0.0.0.0', () => {
  log(`🎯 Webhook server listening on port ${PORT}`);
  log(`📍 Health check: http://localhost:${PORT}/health`);
  log(`📍 Trigger URL: http://localhost:${PORT}/trigger`);
  log(`📍 Status URL: http://localhost:${PORT}/status`);
  log(`📍 Logs URL: http://localhost:${PORT}/logs`);
  log(`\n⚠️  IMPORTANT: Set WEBHOOK_SECRET environment variable for security!`);
  log(`   Current secret: ${WEBHOOK_SECRET}`);
});

server.on('error', (error) => {
  log(`❌ Server error: ${error.message}`);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  log('🛑 SIGINT received, shutting down gracefully...');
  server.close(() => {
    log('✅ Server closed');
    process.exit(0);
  });
});

