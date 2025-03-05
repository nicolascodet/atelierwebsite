import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { Headers } from 'next/dist/compiled/@edge-runtime/primitives';

// For debugging purposes
const DEBUG = true;

// IMPORTANT: This is only for development environments
// In production, this should be removed as it bypasses SSL certificate validation
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  if (DEBUG) console.log('⚠️ SSL certificate validation disabled for development');
}

export async function POST(req: Request) {
  try {
    // Parse the JSON request body
    const { prompt } = await req.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'Replicate API token not configured' },
        { status: 500 }
      );
    }

    if (DEBUG) console.log(`🖼️ Generating image with prompt: "${prompt}"`);

    try {
      // Initialize Replicate client
      const replicate = new Replicate({
        auth: apiToken,
      });

      // Start a prediction
      const prediction = await replicate.predictions.create({
        version: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
        input: {
          prompt: prompt,
          width: 768,
          height: 768,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 30,
        },
      });

      if (DEBUG) console.log('Prediction data:', prediction);

      // Return just the essential information
      return NextResponse.json({
        id: prediction.id,
        status: prediction.status,
        created_at: prediction.created_at,
        raw_response: DEBUG ? prediction : undefined
      });
    } catch (error: any) {
      if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || 
          error.code === 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY') {
        console.error('Certificate error:', error);
        return NextResponse.json(
          { 
            error: 'Certificate error connecting to image service',
            details: error.message,
            code: error.code,
            stack: DEBUG ? error.stack : undefined
          },
          { status: 503 }
        );
      } else {
        console.error('Error with Replicate API:', error);
        return NextResponse.json(
          { 
            error: 'Failed to connect to image generation service',
            details: error.message,
            stack: DEBUG ? error.stack : undefined
          },
          { status: 503 }
        );
      }
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
