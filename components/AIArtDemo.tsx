'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Style {
  id: string;
  name: string;
  prompt: string;
  description: string;
}

const artStyles: Style[] = [
  {
    id: 'bw-photography',
    name: 'Black & White Photography',
    prompt: 'black and white photography, dramatic lighting, strong contrast',
    description: 'Dramatic monochrome with rich contrasts'
  },
  {
    id: 'baroque',
    name: 'Classical Baroque',
    prompt: 'baroque style, dramatic, ornate, rich colors, chiaroscuro, detailed',
    description: 'Rich, dramatic and ornate classical style'
  },
  {
    id: 'art-nouveau',
    name: 'Art Nouveau',
    prompt: 'art nouveau style, elegant, decorative, floral patterns, organic forms',
    description: 'Elegant decorative style with organic forms'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    prompt: 'cinematic, professional photography, dramatic lighting, shallow depth of field',
    description: 'Professional movie-like photography'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    prompt: 'minimalist style, simple, clean lines, uncluttered, neutral colors',
    description: 'Clean, simple and uncluttered'
  }
];

export default function AIArtDemo() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
  };

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle) {
      setError('Please enter a prompt and select a style');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setGeneratedImage(null);
    setStatusMessage('Starting generation...');
    
    try {
      // Step 1: Enhance the prompt
      setStatusMessage('Enhancing your prompt...');
      const enhanceResponse = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedStyle }),
      });
      
      if (!enhanceResponse.ok) {
        const errorData = await enhanceResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to enhance prompt');
      }
      
      const enhanceData = await enhanceResponse.json();
      console.log('Enhanced prompt:', enhanceData.enhancedPrompt);
      
      // Step 2: Generate image using our working API
      setStatusMessage('Generating image (this may take up to 20 seconds)...');
      
      const generateResponse = await fetch('/api/minimal-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: enhanceData.enhancedPrompt }),
      });
      
      if (!generateResponse.ok) {
        const errorData = await generateResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to generate image');
      }
      
      const generateData = await generateResponse.json();
      
      if (generateData.imageUrl) {
        setGeneratedImage(generateData.imageUrl);
        setIsGenerating(false);
        setStatusMessage('Image generated successfully!');
      } else {
        throw new Error('No image URL received');
      }
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(`Generation failed: ${err.message}`);
      setIsGenerating(false);
      setStatusMessage('Generation failed');
    }
  };

  const clearDemo = () => {
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
    setStatusMessage(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try it out</h2>
        <p className="text-lg text-gray-600">Create your perfect art</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Style & Prompt</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select a style</label>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
              {artStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className={`p-3 text-left rounded-md transition ${
                    selectedStyle?.id === style.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-sm font-medium">{style.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="prompt-input" className="block text-sm font-medium mb-2">Describe your art</label>
            <textarea
              id="prompt-input"
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful minimalist photo frame on a white wall..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              disabled={isGenerating}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !selectedStyle}
              className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </button>
            
            {generatedImage && (
              <button
                onClick={clearDemo}
                className="px-5 py-2 border border-gray-300 rounded-md font-medium transition hover:bg-gray-50"
              >
                Reset
              </button>
            )}
          </div>
          
          {statusMessage && (
            <div className="mt-4 text-sm text-gray-600">
              <p>{statusMessage}</p>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-red-800 text-sm">
              <p>{error}</p>
            </div>
          )}
        </div>
        
        <div className="order-first md:order-last">
          {generatedImage ? (
            <div className="flex justify-center items-center h-full">
              <motion.div 
                className="relative transform transition-all duration-700 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                {/* The Atelier Frame */}
                <div className="relative">
                  {/* Walnut wood frame */}
                  <div className="bg-gradient-to-br from-[#5d4037] to-[#3e2723] p-[12px] sm:p-[20px] rounded-sm shadow-2xl relative overflow-hidden">
                    {/* Inner matting */}
                    <div className="bg-[#f5f5f0] p-2 sm:p-4 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]">
                      {/* Image container - 16:9 aspect ratio */}
                      <div className="relative" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={generatedImage}
                          alt="Generated artwork in frame"
                          className="w-full h-full object-cover block"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Atelier logo watermark */}
                  <div className="absolute bottom-5 right-5 opacity-80">
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C13.5913 22 15.1174 21.5308 16.4223 20.6518C17.7271 19.7727 18.7485 18.5233 19.3712 17.0615C19.994 15.5997 20.191 13.9911 19.9384 12.4393C19.6857 10.8874 18.9949 9.46197 17.9497 8.31802C16.9046 7.17407 15.5537 6.36683 14.0559 6.00039C12.5582 5.63396 10.9804 5.72374 9.5301 6.25859C8.07977 6.79344 6.81743 7.7469 5.90265 9.00098C4.98787 10.2551 4.46875 11.7585 4.42578 13.3125C4.38444 14.8215 4.81055 16.3081 5.65625 17.5625" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22C12.6628 22 13.2989 21.7233 13.7678 21.2322C14.2366 20.741 14.5133 20.1049 14.5133 19.4421C14.5133 18.7794 14.2366 18.1433 13.7678 17.6522C13.2989 17.161 12.6628 16.8843 12 16.8843C11.3372 16.8843 10.7011 17.161 10.2322 17.6522C9.76339 18.1433 9.48667 18.7794 9.48667 19.4421C9.48667 20.1049 9.76339 20.741 10.2322 21.2322C10.7011 21.7233 11.3372 22 12 22Z" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16.8844V11.918" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9.75586L12 7.5391" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Wall shadow effect */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] h-8 bg-black/15 blur-xl rounded-full"></div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="w-32 h-32 mb-4 opacity-30">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 16L7 12L10 15L17 8L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-500 text-center">Your generated artwork will appear here</p>
              <p className="text-gray-400 text-sm mt-2 text-center">Select a style and enter your prompt to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
