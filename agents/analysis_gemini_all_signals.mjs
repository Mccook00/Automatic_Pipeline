#!/usr/bin/env node

import 'dotenv/config';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiMultiKeyManager } from './gemini_multi_key_manager.mjs';
import { GroqMultiKeyManager } from './groq_multi_key_manager.mjs';

export async function analyzeAllSignalsWithGemini(signals) {
  console.log('\n🧠 Starting Gemini ALL Signals Analysis...');
  console.log(`📊 Processing ${signals.length} signals for comprehensive analysis`);
  
  const keyManager = new GeminiMultiKeyManager();
  keyManager.displayStatus();
  
  if (keyManager.apiKeys.length === 0) {
    console.log('❌ No Gemini API keys found in .env file');
    return null;
  }

  console.log('✅ Gemini multi-key manager initialized');

  const results = createEmptyResults(signals.length, 'Gemini');

  const BATCH_SIZE = 10;
  const batches = [];
  for (let i = 0; i < signals.length; i += BATCH_SIZE) {
    batches.push(signals.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦 Processing ${batches.length} batches of ${BATCH_SIZE} signals each`);

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📊 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} signals)`);

    try {
      const batchResults = await processBatchWithGeminiAllSignals(batch, batchIndex, keyManager);
      results.all_analyses.push(...batchResults);
      results.analyzed_signals += batch.length;
      
      console.log(`✅ Batch ${batchIndex + 1} complete: ${batchResults.length} analyses found`);
      
      if (batchIndex < batches.length - 1) {
        console.log(`⏳ Waiting 5s before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Error processing batch ${batchIndex + 1}: ${error.message}`);
      results.errors.push({
        batch_index: batchIndex,
        error: error.message
      });
    }
  }
  
  const { resultsFile, summaryFile } = saveResultsAndSummary(results, 'Gemini');
  
  console.log(`\n✅ Gemini ALL Signals Analysis Complete!`);
  console.log(`📊 Analyzed: ${results.analyzed_signals}/${results.total_signals} signals`);
  console.log(`🎯 All analyses found: ${results.all_analyses.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log(`📁 Results saved to: ${resultsFile}`);
  console.log(`📄 Summary saved to: ${summaryFile}`);
  
  return results;
}

// New: OpenRouter-based analysis (used when Gemini quota is exhausted or disabled)
export async function analyzeAllSignalsWithOpenRouter(signals) {
  console.log('\n🧠 Starting OpenRouter ALL Signals Analysis...');
  console.log(`📊 Processing ${signals.length} signals for comprehensive analysis`);

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.log('❌ OPENROUTER_API_KEY not found in .env file');
    return null;
  }

  const model = process.env.OPENROUTER_MODEL || 'openrouter/auto';
  console.log(`✅ Using OpenRouter model: ${model}`);

  const results = createEmptyResults(signals.length, 'OpenRouter');

  const BATCH_SIZE = 10;
  const batches = [];
  for (let i = 0; i < signals.length; i++) {
    batches.push(signals.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦 Processing ${batches.length} batches of ${BATCH_SIZE} signals each`);

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📊 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} signals)`);

    try {
      const batchResults = await processBatchWithOpenRouterAllSignals(batch, batchIndex, apiKey, model);
      results.all_analyses.push(...batchResults);
      results.analyzed_signals += batch.length;
      
      console.log(`✅ Batch ${batchIndex + 1} complete: ${batchResults.length} analyses found`);
      
      if (batchIndex < batches.length - 1) {
        console.log(`⏳ Waiting 5s before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Error processing batch ${batchIndex + 1}: ${error.message}`);
      results.errors.push({
        batch_index: batchIndex,
        error: error.message
      });
    }
  }
  
  const { resultsFile, summaryFile } = saveResultsAndSummary(results, 'OpenRouter');
  
  console.log(`\n✅ OpenRouter ALL Signals Analysis Complete!`);
  console.log(`📊 Analyzed: ${results.analyzed_signals}/${results.total_signals} signals`);
  console.log(`🎯 All analyses found: ${results.all_analyses.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log(`📁 Results saved to: ${resultsFile}`);
  console.log(`📄 Summary saved to: ${summaryFile}`);
  
  return results;
}

// New: Groq-based analysis (preferred cheap option when GROQ_API_KEY is available)
export async function analyzeAllSignalsWithGroq(signals) {
  console.log('\n🧠 Starting Groq ALL Signals Analysis...');
  console.log(`📊 Processing ${signals.length} signals for comprehensive analysis`);
  
  const keyManager = new GroqMultiKeyManager();
  keyManager.displayStatus();
  
  if (keyManager.apiKeys.length === 0) {
    console.log('❌ No Groq API keys found in .env file');
    return null;
  }

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
  console.log(`✅ Using Groq model: ${model}`);
  console.log('✅ Groq multi-key manager initialized');

  const results = createEmptyResults(signals.length, 'Groq');

  const BATCH_SIZE = 10;
  const batches = [];
  for (let i = 0; i < signals.length; i += BATCH_SIZE) {
    batches.push(signals.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦 Processing ${batches.length} batches of ${BATCH_SIZE} signals each`);

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`\n📊 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} signals)`);

    try {
      const batchResults = await processBatchWithGroqAllSignals(batch, batchIndex, keyManager, model);
      results.all_analyses.push(...batchResults);
      results.analyzed_signals += batch.length;
      
      console.log(`✅ Batch ${batchIndex + 1} complete: ${batchResults.length} analyses found`);
      
      if (batchIndex < batches.length - 1) {
        console.log(`⏳ Waiting 5s before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error(`❌ Error processing batch ${batchIndex + 1}: ${error.message}`);
      results.errors.push({
        batch_index: batchIndex,
        error: error.message
      });
    }
  }
  
  const { resultsFile, summaryFile } = saveResultsAndSummary(results, 'Groq');
  
  console.log(`\n✅ Groq ALL Signals Analysis Complete!`);
  console.log(`📊 Analyzed: ${results.analyzed_signals}/${results.total_signals} signals`);
  console.log(`🎯 All analyses found: ${results.all_analyses.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log(`📁 Results saved to: ${resultsFile}`);
  console.log(`📄 Summary saved to: ${summaryFile}`);
  
  return results;
}

function createEmptyResults(totalSignals, provider) {
  return {
    timestamp: new Date().toISOString(),
    provider,
    total_signals: totalSignals,
    analyzed_signals: 0,
    all_analyses: [], // Store ALL analyses, not just opportunities
    errors: []
  };
}

function saveResultsAndSummary(results, providerLabel) {
  // Save results
  const today = new Date().toISOString().slice(0, 10);
  const outputDir = path.join('data', today);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Keep original filenames so Phase 3 doesn't need to change
  const resultsFile = path.join(outputDir, 'gemini_all_signals_analysis.json');
  const summaryFile = path.join(outputDir, 'gemini_all_signals_summary.txt');
  
  writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  
  // Create comprehensive summary
  const summary = `${providerLabel} ALL Signals Analysis Results - ${today}
==============================================

Total Signals Analyzed: ${results.analyzed_signals}/${results.total_signals}
All Analyses Found: ${results.all_analyses.length}
Errors: ${results.errors.length}

SCORING DISTRIBUTION:
====================
${getScoringDistribution(results.all_analyses)}

TOP OPPORTUNITIES (Score 7-10):
===============================
${results.all_analyses
  .filter(analysis => Math.round(analysis.score / 10) >= 7)
  .sort((a, b) => b.score - a.score)
  .slice(0, 20)
  .map((analysis, index) => `${index + 1}. ${analysis.project_name} (Score: ${Math.round(analysis.score / 10)}/10)
   Type: ${analysis.opportunity_type}
   Importance: ${analysis.importance}
   Market Impact: ${analysis.market_impact || 'Unknown'}
   Timeline: ${analysis.timeline || 'Unknown'}
   Investment Angle: ${analysis.investment_angle}
   Risk: ${analysis.risk_level}
   Evidence: ${analysis.evidence ? analysis.evidence.join(', ') : 'None'}
   Reasoning: ${analysis.reasoning}
`).join('\n')}

NEED MANUAL CHECK (Score 4-6):
==============================
${results.all_analyses
  .filter(analysis => {
    const score = Math.round(analysis.score / 10);
    return score >= 4 && score <= 6;
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 20)
  .map((analysis, index) => `${index + 1}. ${analysis.project_name} (Score: ${Math.round(analysis.score / 10)}/10)
   Type: ${analysis.opportunity_type}
   Importance: ${analysis.importance}
   Market Impact: ${analysis.market_impact || 'Unknown'}
   Timeline: ${analysis.timeline || 'Unknown'}
   Investment Angle: ${analysis.investment_angle}
   Risk: ${analysis.risk_level}
   Evidence: ${analysis.evidence ? analysis.evidence.join(', ') : 'None'}
   Reasoning: ${analysis.reasoning}
`).join('\n')}

POTENTIAL SCAMS (Score 1-3):
============================
${results.all_analyses
  .filter(analysis => Math.round(analysis.score / 10) <= 3)
  .sort((a, b) => b.score - a.score)
  .slice(0, 20)
  .map((analysis, index) => `${index + 1}. ${analysis.project_name} (Score: ${Math.round(analysis.score / 10)}/10)
   Type: ${analysis.opportunity_type}
   Importance: ${analysis.importance}
   Market Impact: ${analysis.market_impact || 'Unknown'}
   Timeline: ${analysis.timeline || 'Unknown'}
   Investment Angle: ${analysis.investment_angle}
   Risk: ${analysis.risk_level}
   Evidence: ${analysis.evidence ? analysis.evidence.join(', ') : 'None'}
   Reasoning: ${analysis.reasoning}
`).join('\n')}
`;

  writeFileSync(summaryFile, summary);

  return { resultsFile, summaryFile };
}

async function processBatchWithGeminiAllSignals(signals, batchIndex, keyManager) {
  const prompt = createAllSignalsAnalysisPrompt(signals);
  const maxRetries = keyManager.apiKeys.length; // Max retries equals number of keys
  
  // Delay between requests
  if (batchIndex > 0) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  for (let retry = 0; retry < maxRetries; retry++) {
    let keyInfo;
    try {
      // Get available API key
      keyInfo = keyManager.getAvailableKey();
      console.log(`🔄 Attempt ${retry + 1}/${maxRetries} with ${keyInfo.name}`);
      
      const genAI = new GoogleGenerativeAI(keyInfo.key);
      // Try a sequence of model ids to avoid 404s on restricted versions
      const preferred = process.env.GEMINI_MODEL && process.env.GEMINI_MODEL.trim();
      // ONLY use gemini-2.0-flash-exp - all other models are deprecated
      const candidateModels = [
        ...(preferred ? [preferred] : []),
        'gemini-2.0-flash-exp'
      ];
      
      console.log(`🔧 Available models: ${candidateModels.join(', ')}`);

      let result;
      let lastModelError = null;
      for (const modelId of candidateModels) {
        try {
          console.log(`🔧 Trying Gemini model: ${modelId}`);
          const model = genAI.getGenerativeModel({ model: modelId });
          result = await model.generateContent(prompt);
          console.log(`✅ Model worked: ${modelId}`);
          lastModelError = null;
          break;
        } catch (modelErr) {
          lastModelError = modelErr;
          console.log(`⚠️  Model failed (${modelId}): ${modelErr.message}`);
          // Try next candidate model
        }
      }

      if (!result) {
        throw new Error(lastModelError ? lastModelError.message : 'No Gemini model succeeded');
      }

      const response = await result.response;
      const text = response.text();
      
      // Record successful usage
      keyManager.recordUsage(keyInfo.name, true);
      console.log(`✅ Success with ${keyInfo.name}`);
      
      // Parse JSON response - handle markdown format
      let jsonText = text;
      if (text.includes('```json')) {
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1];
        }
      }
      
      const analysis = JSON.parse(jsonText);
      return Array.isArray(analysis) ? analysis : [analysis];
      
    } catch (error) {
      console.log(`❌ Error with ${keyInfo.name}: ${error.message}`);
      
      // Record failed usage
      keyManager.recordUsage(keyInfo.name, false);
      
      // Check if it's a 429 error (rate limit) or 503 (service unavailable)
      if (error.message.includes('429') || error.message.includes('503')) {
        console.log(`🔄 Rate limit/service error with ${keyInfo.name}, trying next key...`);
        
        // Mark this key as exhausted if it's a 429 error
        if (error.message.includes('429')) {
          const keyUsage = keyManager.usage[keyInfo.name] || { requests: 0, errors: 0, exhausted: false };
          keyUsage.exhausted = true;
          keyManager.usage[keyInfo.name] = keyUsage;
          keyManager.saveUsage();
          console.log(`⚠️  Marked ${keyInfo.name} as exhausted due to 429 error`);
        }
        
        // Wait a bit before trying next key
        if (retry < maxRetries - 1) {
          console.log(`⏳ Waiting 3s before trying next key...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        continue; // Try next key
      } else {
        // For other errors, don't retry
        throw new Error(`Gemini analysis failed: ${error.message}`);
      }
    }
  }
  
  // If we get here, all keys failed
  throw new Error(`All Gemini API keys failed after ${maxRetries} attempts`);
}

function createAllSignalsAnalysisPrompt(signals) {
  const signalsText = signals.map((signal, index) => {
    return `${index + 1}. **${signal.title || 'Untitled'}**
   Source: ${signal.source}
   URL: ${signal.link || 'No URL'}
   Channel: ${signal.channel || 'Unknown'}
   Category: ${signal.category || 'Unknown'}
   Priority: ${signal.priority || 'Unknown'}`;
  }).join('\n\n');

  return `You are a comprehensive cryptocurrency signal analyst. Analyze ALL these signals and provide analysis for EVERY SINGLE ONE.

For EACH signal, you MUST provide analysis regardless of whether it's an opportunity or not. Analyze:
- Investment opportunities (ICOs, partnerships, product launches)
- Market updates and news
- Technical developments
- Potential scams or suspicious activities
- General crypto news and updates
- Airdrops and rewards
- DeFi protocols and innovations
- Layer 2 solutions
- Cross-chain developments

For EVERY signal, provide:
- Project/entity name
- Signal type (Opportunity|News|Update|Scam|Technical|Partnership|Funding|Airdrop|DeFi|L2|Bridge|Other)
- Importance level
- Investment angle (even if negative)
- Risk assessment
- Evidence/sources
- Reasoning
- Score (1-100)
- Market impact
- Timeline

Return ONLY valid JSON in this format:
[
  {
    "project_name": "Project/Entity Name",
    "opportunity_type": "Opportunity|News|Update|Scam|Technical|Partnership|Funding|Airdrop|DeFi|L2|Bridge|Other",
    "importance": "High|Medium|Low",
    "investment_angle": "Description of investment angle (positive or negative)",
    "risk_level": "Low|Medium|High",
    "evidence": ["url1", "url2"],
    "reasoning": "Why this signal is important or not",
    "score": 85,
    "market_impact": "High|Medium|Low",
    "timeline": "Immediate|Short-term|Medium-term|Long-term"
  }
]

IMPORTANT: You MUST analyze ALL ${signals.length} signals. Return an array with exactly ${signals.length} items.

Signals to analyze:
${signalsText}

Return valid JSON only, no other text.`;
}

function getScoringDistribution(analyses) {
  const distribution = analyses.reduce((acc, analysis) => {
    const score = Math.round(analysis.score / 10);
    if (score >= 7) acc.good++;
    else if (score >= 4) acc.check++;
    else acc.scam++;
    return acc;
  }, { good: 0, check: 0, scam: 0 });
  
  return `Good Opportunities (7-10): ${distribution.good}
Need Manual Check (4-6): ${distribution.check}
Potential Scams (1-3): ${distribution.scam}`;
}

async function processBatchWithOpenRouterAllSignals(signals, batchIndex, apiKey, model) {
  const prompt = createAllSignalsAnalysisPrompt(signals);

  // Small delay between batches to be gentle with rate limits
  if (batchIndex > 0) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      // Optional but recommended by OpenRouter
      'HTTP-Referer': 'https://github.com/pipeline-early-stage',
      'X-Title': 'Pipeline Early Stage - All Signals Analysis'
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a comprehensive cryptocurrency signal analyst. Return ONLY valid JSON as instructed.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`OpenRouter request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();

  const choice = data.choices && data.choices[0];
  if (!choice || !choice.message) {
    throw new Error('OpenRouter response missing choices[0].message');
  }

  let content = choice.message.content;
  let text;

  // OpenRouter can return content as string or array of parts
  if (Array.isArray(content)) {
    text = content.map(part => part.text || '').join('\n').trim();
  } else {
    text = (content || '').toString().trim();
  }

  if (!text) {
    throw new Error('OpenRouter returned empty content');
  }

  // Handle possible ```json fenced response
  let jsonText = text;
  if (text.includes('```json')) {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
  } else if (text.includes('```')) {
    const jsonMatch = text.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
  }

  let analysis;
  try {
    analysis = JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`Failed to parse OpenRouter JSON: ${err.message}`);
  }

  return Array.isArray(analysis) ? analysis : [analysis];
}

async function processBatchWithGroqAllSignals(signals, batchIndex, keyManager, model) {
  const prompt = createAllSignalsAnalysisPrompt(signals);
  const maxRetries = keyManager.apiKeys.length; // Max retries equals number of keys
  
  // Delay between requests
  if (batchIndex > 0) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  for (let retry = 0; retry < maxRetries; retry++) {
    let keyInfo;
    try {
      // Get available API key
      keyInfo = keyManager.getAvailableKey();
      console.log(`🔄 Attempt ${retry + 1}/${maxRetries} with ${keyInfo.name}`);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${keyInfo.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are a comprehensive cryptocurrency signal analyst. Return ONLY valid JSON as instructed.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = {};
        }
        
        // Check if it's a rate limit error (429)
        if (response.status === 429) {
          console.log(`❌ Rate limit error with ${keyInfo.name}: ${errorText}`);
          keyManager.recordUsage(keyInfo.name, false);
          keyManager.markAsExhausted(keyInfo.name, 'Rate limit (429)');
          
          // Extract retry-after from error if available
          const retryAfter = errorData.error?.message?.match(/try again in ([\d.]+)s/i);
          const waitTime = retryAfter ? parseFloat(retryAfter[1]) * 1000 : 3000;
          
          if (retry < maxRetries - 1) {
            console.log(`⏳ Waiting ${waitTime/1000}s before trying next key...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
          continue; // Try next key
        }
        
        throw new Error(`Groq request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      const choice = data.choices && data.choices[0];
      if (!choice || !choice.message) {
        throw new Error('Groq response missing choices[0].message');
      }

      let content = choice.message.content;
      let text;

      // Groq returns OpenAI-compatible format; content is usually a string
      if (Array.isArray(content)) {
        text = content.map(part => part.text || '').join('\n').trim();
      } else {
        text = (content || '').toString().trim();
      }

      if (!text) {
        throw new Error('Groq returned empty content');
      }

      // Record successful usage
      keyManager.recordUsage(keyInfo.name, true);
      console.log(`✅ Success with ${keyInfo.name}`);
      
      // Handle possible ```json fenced response
      let jsonText = text;
      if (text.includes('```json')) {
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1];
        }
      } else if (text.includes('```')) {
        const jsonMatch = text.match(/```\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1];
        }
      }

      let analysis;
      try {
        analysis = JSON.parse(jsonText);
      } catch (err) {
        throw new Error(`Failed to parse Groq JSON: ${err.message}`);
      }

      return Array.isArray(analysis) ? analysis : [analysis];
      
    } catch (error) {
      console.log(`❌ Error with ${keyInfo.name}: ${error.message}`);
      
      // Record failed usage
      keyManager.recordUsage(keyInfo.name, false);
      
      // Check if it's a 429 error (rate limit) or 503 (service unavailable)
      if (error.message.includes('429') || error.message.includes('503')) {
        console.log(`🔄 Rate limit/service error with ${keyInfo.name}, trying next key...`);
        
        // Mark this key as exhausted if it's a 429 error
        if (error.message.includes('429')) {
          keyManager.markAsExhausted(keyInfo.name, 'Rate limit (429)');
        }
        
        // Wait a bit before trying next key
        if (retry < maxRetries - 1) {
          console.log(`⏳ Waiting 3s before trying next key...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        continue; // Try next key
      } else {
        // For other errors, don't retry
        throw new Error(`Groq analysis failed: ${error.message}`);
      }
    }
  }
  
  // If we get here, all keys failed
  throw new Error(`All Groq API keys failed after ${maxRetries} attempts`);
}
