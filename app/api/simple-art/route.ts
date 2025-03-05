import { NextRequest, NextResponse } from 'next/server';

// Disable certificate validation for development only
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    
    console.log(`Generating image with prompt: "${prompt}"`);
    
    const apiToken = process.env.REPLICATE_API_TOKEN;
    
    if (!apiToken) {
      console.error('Missing REPLICATE_API_TOKEN');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    
    // Create prediction
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-1.1-pro",
        input: {
          prompt: prompt,
          prompt_upsampling: true
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Replicate API error:', errorData);
      return NextResponse.json({ 
        error: 'Failed to start image generation', 
        details: errorData 
      }, { status: response.status });
    }
    
    const prediction = await response.json();
    console.log('Prediction created:', prediction.id);
    
    // Return a placeholder for now (in production would poll for results)
    return NextResponse.json({ 
      success: true,
      id: prediction.id,
      status: prediction.status,
      imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809' // Placeholder
    });
    
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ 
      error: 'Failed to generate image', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
