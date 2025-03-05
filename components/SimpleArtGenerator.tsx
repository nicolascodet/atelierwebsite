import { useState, useEffect } from 'react';

export default function SimpleArtGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [predictionId, setPredictionId] = useState<string | null>(null);

  // Poll for prediction results
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (predictionId && isGenerating) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`/api/get-prediction?id=${predictionId}`);
          const data = await response.json();
          
          console.log('Polling status:', data.status);
          
          if (data.status === 'succeeded') {
            clearInterval(intervalId);
            setIsGenerating(false);
            setImageUrl(data.output?.[0] || data.output);
            setStatus('Image generated successfully!');
          } else if (data.status === 'failed') {
            clearInterval(intervalId);
            setIsGenerating(false);
            setError('Image generation failed');
            setStatus('Generation failed');
          } else {
            setStatus(`Status: ${data.status}...`);
          }
        } catch (err) {
          console.error('Polling error:', err);
          // Don't stop polling on error, just try again
        }
      }, 2000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [predictionId, isGenerating]);

  const generateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      setImageUrl(null);
      setPredictionId(null);
      setStatus('Starting generation...');

      const response = await fetch('/api/simple-art', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: prompt + ", high quality, detailed, 8k, photorealistic"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      // If we get an immediate image URL (placeholder or real)
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
      
      // If we get a prediction ID, start polling
      if (data.id) {
        setPredictionId(data.id);
      } else {
        // If no prediction ID, we're done
        setIsGenerating(false);
      }
      
      setStatus(data.status || 'Processing...');
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('Generation failed');
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Art Generator</h2>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium mb-1">
          Describe your image
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="A beautiful minimalist photo frame on a white wall"
          rows={3}
        />
      </div>

      <button
        onClick={generateImage}
        disabled={isGenerating || !prompt}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </button>

      {status && (
        <p className="mt-2 text-sm text-gray-600">{status}</p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Generated Image</h3>
          <img 
            src={imageUrl} 
            alt="Generated art" 
            className="w-full max-w-lg rounded shadow-md" 
            onError={() => {
              console.error('Image failed to load:', imageUrl);
              setError('Failed to load the generated image');
            }}
          />
        </div>
      )}
    </div>
  );
}
