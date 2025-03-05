import { NextRequest, NextResponse } from 'next/server';

// Disable certificate validation for development only
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
  const predictionId = request.nextUrl.searchParams.get('id');
  
  if (!predictionId) {
    return NextResponse.json({ error: 'Prediction ID is required' }, { status: 400 });
  }
  
  try {
    const apiToken = process.env.REPLICATE_API_TOKEN;
    
    if (!apiToken) {
      console.error('Missing REPLICATE_API_TOKEN');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Replicate API error:', errorData);
      return NextResponse.json({ 
        error: 'Failed to get prediction status', 
        details: errorData 
      }, { status: response.status });
    }
    
    const prediction = await response.json();
    console.log('Prediction status:', prediction.status);
    
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Error checking prediction status:', error);
    return NextResponse.json({
      error: 'Failed to check prediction status',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
