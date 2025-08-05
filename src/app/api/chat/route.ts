/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { practiceConfigs } from '@/lib/practice-config';

export async function POST(request: NextRequest) {
  try {
    const { message, history, practiceId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get OpenAI API key from environment
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Simplified practice configuration detection - prioritize environment variable
    let practiceConfig;
    const referer = request.headers.get('referer') || '';
    const host = request.headers.get('host') || '';
    
    console.log(`🔍 Chat API Request Details:`, {
      practiceId,
      envPracticeId: process.env.PRACTICE_ID,
      referer,
      host,
      availablePractices: Object.keys(practiceConfigs)
    });

    // Priority 1: Environment variable (most reliable for Railway deployments)
    if (process.env.PRACTICE_ID && practiceConfigs[process.env.PRACTICE_ID]) {
      practiceConfig = practiceConfigs[process.env.PRACTICE_ID];
      console.log(`✅ Using practice from environment: ${process.env.PRACTICE_ID}`);
    }
    // Priority 2: Explicit practiceId from client
    else if (practiceId && practiceConfigs[practiceId]) {
      practiceConfig = practiceConfigs[practiceId];
      console.log(`✅ Using practiceId from client: ${practiceId}`);
    }
    // Priority 3: Host header detection for specific deployments
    else if (host.includes('railway.app')) {
      // Try to extract practice from Railway subdomain
      const subdomain = host.split('.')[0];
      for (const [key, config] of Object.entries(practiceConfigs)) {
        if (subdomain.includes(key) || subdomain.includes(config.name.toLowerCase().replace(/\s+/g, '-'))) {
          practiceConfig = config;
          console.log(`✅ Using ${config.name} from Railway subdomain: ${subdomain}`);
          break;
        }
      }
    }
    // Final fallback: Smith Chiropractic
    if (!practiceConfig) {
      practiceConfig = practiceConfigs.smith;
      console.log(`⚠️ Using Smith as final fallback`);
    }

    console.log(`💬 Final chat configuration: ${practiceConfig.name} (${practiceConfig.id})`);

    // Prepare messages for the API
    const messages = [
      {
        role: 'system',
        content: practiceConfig.chat.systemPrompt
      },
      // Add conversation history (last 10 messages for context)
      ...(history || []).slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response format from OpenAI API:', data);
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      );
    }

    const aiMessage = data.choices[0].message.content;

    return NextResponse.json({
      message: aiMessage,
      timestamp: new Date().toISOString(),
      practice: practiceConfig.name,
      practiceId: practiceConfig.id,
      doctor: practiceConfig.doctor,
      debug: {
        detectedPractice: practiceConfig.id,
        usedMethod: practiceId ? 'clientPracticeId' : 
                   host.includes('spinealign-center') || host.includes(':3000') ? 'hostHeader' :
                   host.includes('smith-chiropractic') || host.includes(':3001') ? 'hostHeader' :
                   process.env.PRACTICE_ID ? 'environmentVar' :
                   process.env.PORT ? 'portDetection' : 'fallback',
        serverPort: process.env.PORT,
        serverPracticeId: process.env.PRACTICE_ID
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 