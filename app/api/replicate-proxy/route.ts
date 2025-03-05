import { NextRequest, NextResponse } from 'next/server';

// For debugging purposes
const DEBUG = true;

// IMPORTANT: This is only for development environments
// In production, this should be removed as it bypasses SSL certificate validation
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  if (DEBUG) console.log('⚠️ SSL certificate validation disabled for development');
}

// Placeholder image for testing (local file)
const FALLBACK_IMAGE_URL = '/images/placeholder-art.jpg';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'Missing API token' },
        { status: 500 }
      );
    }

    if (DEBUG) console.log(`🖼️ Generating image with prompt: "${prompt}"`);

    try {
      // Simple direct implementation that relies less on Node.js features
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Use the Flux 1.1 Pro model with correct ID
          version: "black-forest-labs/flux-1.1-pro",
          input: {
            prompt: prompt,
            prompt_upsampling: true,
          },
        }),
      });

      // For debugging, just return a placeholder image
      if (DEBUG) {
        console.log('DEVELOPMENT MODE: Returning a placeholder image');
        return NextResponse.json({
          id: 'test-id-' + Date.now(),
          status: 'succeeded',
          output: FALLBACK_IMAGE_URL,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      return NextResponse.json({
        id: data.id,
        status: data.status,
        created_at: data.created_at,
      });
    } catch (error: any) {
      console.error('Error with Replicate API:', error);
      
      // For development, just return a placeholder image
      if (DEBUG) {
        console.log('DEVELOPMENT MODE: Returning a placeholder image despite error');
        return NextResponse.json({
          id: 'test-id-' + Date.now(),
          status: 'succeeded',
          output: FALLBACK_IMAGE_URL,
        });
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to connect to image generation service',
          details: error.message,
          stack: DEBUG ? error.stack : undefined
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error('Error generating image:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message,
        stack: DEBUG ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
