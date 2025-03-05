import { NextRequest, NextResponse } from 'next/server';

// If we're in development, do not verify SSL certificates
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// This is a simplified version that doesn't require OpenAI
// It just combines the user prompt with the style prompt
export async function POST(req: NextRequest) {
  try {
    const { prompt, style } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    
    console.log('Enhancing prompt:', prompt);
    console.log('Style:', style);
    
    // Simply combine the user prompt with the style prompt for consistent and predictable results
    const enhancedPrompt = `${prompt}, ${style?.prompt || 'high quality, detailed'}, 8k, photorealistic`;
    
    console.log('Enhanced prompt:', enhancedPrompt);
    
    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to enhance prompt" },
      { status: 500 }
    );
  }
}
