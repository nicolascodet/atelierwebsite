import { NextRequest, NextResponse } from 'next/server';

// Disable certificate validation for development only
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const apiToken = process.env.REPLICATE_API_TOKEN;
    
    console.log(`Creating prediction with prompt: "${prompt}"`);
    
    // Step 1: Create the prediction
    const createResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-1.1-pro",
        input: {
          prompt: prompt,
          prompt_upsampling: true,
          width: 1344,          // 16:9 aspect ratio (16 * 84 = 1344)
          height: 756,         // 9 * 84 = 756
          num_inference_steps: 30
        },
      }),
    });
    
    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('Failed to create prediction:', errorData);
      return NextResponse.json({ error: 'Failed to create prediction' }, { status: 500 });
    }
    
    const prediction = await createResponse.json();
    console.log('Prediction created:', prediction.id);
    
    // Step 2: Poll for results (up to 10 times with 2-second intervals)
    let imageUrl = null;
    let attempts = 0;
    
    while (attempts < 10) {
      attempts++;
      console.log(`Checking prediction status (attempt ${attempts})...`);
      
      // Wait 2 seconds between checks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!statusResponse.ok) {
        console.error('Failed to check prediction status');
        continue;
      }
      
      const status = await statusResponse.json();
      console.log('Status:', status.status);
      
      if (status.status === 'succeeded') {
        imageUrl = status.output;
        console.log('Image generated successfully:', imageUrl);
        break;
      } else if (status.status === 'failed') {
        console.error('Prediction failed:', status.error);
        return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
      }
      
      // If still processing, continue to next attempt
    }
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Timed out waiting for image generation' }, { status: 504 });
    }
    
    return NextResponse.json({ imageUrl });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
