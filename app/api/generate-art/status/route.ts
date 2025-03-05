import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// For debugging purposes
const DEBUG = true;

// IMPORTANT: This is only for development environments
// In production, this should be removed as it bypasses SSL certificate validation
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  if (DEBUG) console.log('⚠️ SSL certificate validation disabled for development');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing generation ID' }, { status: 400 });
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    if (DEBUG) console.log(`🔍 Checking status for prediction: ${id}`);

    try {
      // Initialize Replicate client
      const replicate = new Replicate({
        auth: apiToken,
      });

      // Get the prediction by ID
      const prediction = await replicate.predictions.get(id);
      
      if (DEBUG) console.log('Status data:', prediction);

      // Return a simplified response
      return NextResponse.json({
        id: prediction.id,
        status: prediction.status,
        output: prediction.output && Array.isArray(prediction.output) && prediction.output.length > 0 
          ? prediction.output[0] 
          : null,
        error: prediction.error,
        created_at: prediction.created_at,
        completed_at: prediction.completed_at,
        // Include raw response for debugging
        raw_response: DEBUG ? prediction : undefined
      });
    } catch (error: any) {
      if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.error('Certificate error:', error);
        return NextResponse.json(
          { 
            error: 'Certificate error',
            details: error.message,
            stack: DEBUG ? error.stack : undefined
          },
          { status: 503 }
        );
      } else {
        console.error('Error checking status:', error);
        return NextResponse.json(
          { 
            error: 'Failed to check generation status',
            details: error.message,
            stack: DEBUG ? error.stack : undefined
          },
          { status: 503 }
        );
      }
    }
  } catch (error: any) {
    console.error('Error in status check:', error);
    
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
