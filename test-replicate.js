// Simple test script for Replicate
require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Replicate = require('replicate');

async function testReplicate() {
  try {
    console.log('Testing Replicate connection...');
    console.log('API Token exists:', !!process.env.REPLICATE_API_TOKEN);
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    
    // Just get a list of models to test the connection
    const models = await replicate.models.list();
    console.log('Connection successful! Found models:', models.length);
    console.log('First model:', models[0]);
    
    return true;
  } catch (error) {
    console.error('Error testing Replicate:', error);
    return false;
  }
}

testReplicate();
