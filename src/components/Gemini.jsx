import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Gemini({ mode, setMarkdown }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize the API and model
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Access Vite environment variable
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // System instruction
  const systemInstruction = `
    Create a README file in Markdown format with the following rules:
    - Start with the title in \`# Title\` format.
    - Use bullet points (\`-\`) and numbered lists (\`1., 2., etc.\`) as required.
    - Ensure Markdown formatting is clean and adheres to standards.
  `;

  // Handle prompt submission
  const handlePromptSubmit = async () => {
    setLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const finalPrompt = `${systemInstruction}\n\n${prompt}`;
      const result = await chatSession.sendMessage(finalPrompt);

      // Append the generated content to the existing markdown
      setMarkdown((prevMarkdown) => `${prevMarkdown}\n\n${result.response.text()}`);
    } catch (error) {
      console.error("Error with Gemini API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-5 bg-${mode === 'black' ? 'gray-900' : 'gray-100'} text-${mode === 'black' ? 'white' : 'black'}`}>
      <span className="text-lg font-bold mb-2">Prompt</span>
      <textarea
        className={`form-control w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
          mode === 'black'
            ? 'bg-gray-800 text-white focus:ring-blue-500'
            : 'bg-gray-200 text-black focus:ring-blue-500'
        }`}
        rows="5"
        placeholder="Your Prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className={`mt-4 px-4 py-2 rounded-md ${
          mode === 'black'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-400 hover:bg-blue-500 text-black'
        }`}
        onClick={handlePromptSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Generate README'}
      </button>
    </div>
  );
}
