import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export class GroqMultiKeyManager {
  constructor() {
    this.apiKeys = this.loadApiKeys();
    this.currentKeyIndex = 0;
    this.usageFile = path.join('data', `groq_usage_${new Date().toISOString().slice(0, 10)}.json`);
    this.usage = this.loadUsage();
    // Groq free tier: 8000 tokens per minute, but we track requests per key
    // For rate limit handling, we'll mark keys as exhausted on 429 errors
    this.maxRequestsPerKey = 1000; // High limit, but we'll mark exhausted on rate limit
  }

  loadApiKeys() {
    const keys = [];
    // Support both GROQ_API_KEY (legacy) and GROQ_API_KEY1, GROQ_API_KEY2, etc.
    const legacyKey = process.env.GROQ_API_KEY;
    if (legacyKey && legacyKey.trim()) {
      keys.push({
        key: legacyKey.trim(),
        index: 0,
        name: 'GROQ_API_KEY'
      });
    }
    
    // Load numbered keys (GROQ_API_KEY1, GROQ_API_KEY2, etc.)
    for (let i = 1; i <= 10; i++) {
      const key = process.env[`GROQ_API_KEY${i}`];
      if (key && key.trim()) {
        keys.push({
          key: key.trim(),
          index: i,
          name: `GROQ_API_KEY${i}`
        });
      }
    }
    return keys;
  }

  loadUsage() {
    if (!existsSync(this.usageFile)) {
      return {};
    }
    try {
      return JSON.parse(readFileSync(this.usageFile, 'utf8'));
    } catch (error) {
      console.error('Error loading Groq usage file:', error.message);
      return {};
    }
  }

  saveUsage() {
    try {
      if (!existsSync('data')) {
        mkdirSync('data', { recursive: true });
      }
      writeFileSync(this.usageFile, JSON.stringify(this.usage, null, 2));
    } catch (error) {
      console.error('Error saving Groq usage file:', error.message);
    }
  }

  getAvailableKey() {
    if (this.apiKeys.length === 0) {
      throw new Error('No Groq API keys available');
    }

    // Find a key that hasn't exceeded the limit and isn't exhausted
    for (let i = 0; i < this.apiKeys.length; i++) {
      const keyIndex = (this.currentKeyIndex + i) % this.apiKeys.length;
      const key = this.apiKeys[keyIndex];
      const keyUsage = this.usage[key.name] || { requests: 0, lastUsed: null, exhausted: false };
      
      console.log(`🔍 Checking ${key.name}: ${keyUsage.requests}/${this.maxRequestsPerKey} requests used, exhausted: ${keyUsage.exhausted}`);
      
      if (keyUsage.requests < this.maxRequestsPerKey && !keyUsage.exhausted) {
        this.currentKeyIndex = keyIndex;
        console.log(`✅ Selected ${key.name} (${keyUsage.requests}/${this.maxRequestsPerKey} used)`);
        return key;
      }
    }

    // If all keys are exhausted, use the first one anyway
    console.log('⚠️  All Groq API keys have reached their limit or are exhausted. Using first key anyway.');
    return this.apiKeys[0];
  }

  recordUsage(keyName, success = true) {
    if (!this.usage[keyName]) {
      this.usage[keyName] = { requests: 0, errors: 0, lastUsed: null, exhausted: false };
    }
    
    this.usage[keyName].requests++;
    this.usage[keyName].lastUsed = new Date().toISOString();
    
    if (!success) {
      this.usage[keyName].errors++;
    }
    
    this.saveUsage();
  }

  markAsExhausted(keyName, reason = 'Rate limit') {
    if (!this.usage[keyName]) {
      this.usage[keyName] = { requests: 0, errors: 0, lastUsed: null, exhausted: false };
    }
    this.usage[keyName].exhausted = true;
    this.usage[keyName].exhaustReason = reason;
    console.log(`⚠️  Marking ${keyName} as exhausted: ${reason}`);
    this.saveUsage();
  }

  displayStatus() {
    console.log('\n🔑 Groq API Keys Status:');
    console.log('========================');
    
    if (this.apiKeys.length === 0) {
      console.log('❌ No Groq API keys found');
      return;
    }

    this.apiKeys.forEach((key, index) => {
      const keyUsage = this.usage[key.name] || { requests: 0, errors: 0, exhausted: false };
      const remaining = Math.max(0, this.maxRequestsPerKey - keyUsage.requests);
      const status = (remaining > 0 && !keyUsage.exhausted) ? '✅' : '❌';
      
      console.log(`${status} ${key.name}: ${keyUsage.requests}/${this.maxRequestsPerKey} requests used (${remaining} remaining)`);
      if (keyUsage.errors > 0) {
        console.log(`   Errors: ${keyUsage.errors}`);
      }
      if (keyUsage.exhausted) {
        console.log(`   Status: EXHAUSTED${keyUsage.exhaustReason ? ` (${keyUsage.exhaustReason})` : ''}`);
      }
    });
  }
}

