import { useState } from 'react';

export default function MinimalArtGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const generateImage = async () => {
    if (!prompt) return;
    
    try {
      setIsLoading(true);
      setError('');
      setImageUrl('');
      setMessage('Generating image - this may take up to 20 seconds...');
      
      const response = await fetch('/api/minimal-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }
      
      setImageUrl(data.imageUrl);
      setMessage('Image generated successfully!');
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setMessage('Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Minimal AI Art Generator</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description for your image"
          className="w-full p-2 border border-gray-300 rounded"
          disabled={isLoading}
        />
      </div>
      
      <button
        onClick={generateImage}
        disabled={isLoading || !prompt}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      
      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Generated art"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}
