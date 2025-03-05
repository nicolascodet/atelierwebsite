// Simple test script for Replicate with Flux model
require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Replicate = require('replicate');

async function testFlux() {
  try {
    console.log('Testing Flux model on Replicate...');
    console.log('API Token exists:', !!process.env.REPLICATE_API_TOKEN);
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    
    console.log('Creating a test image...');
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      {
        input: {
          prompt: "A beautiful minimalist photo frame on a white wall, elegant design",
          prompt_upsampling: true
        }
      }
    );
    
    console.log('Image generation successful!');
    console.log('Output URL:', output);
    
    return true;
  } catch (error) {
    console.error('Error testing Flux model:', error);
    return false;
  }
}

testFlux();
