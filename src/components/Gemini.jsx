import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Gemini(props) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
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
    From now on, for every prompt I give you:
    - Create a README file in Markdown format.
    - Use the following rules:
      1. Start with the title in \`# Title\` format.
      2. Add an introductory description after the title.
      3. Include a \`## Table of Contents\` section listing all headings using bullet points (\`-\`), linking to sections below.
      4. Use \`##\` for section headings.
      5. For "Getting Started," use ordered lists (\`1.\`, \`2.\`, etc.) for step-by-step instructions.
      6. For "Features," use bullet points (\`-\`) to list highlights.
      7. Include example code snippets in a code block (use triple backticks: \`\`\`).
      8. Format all links as \`[text](URL)\`.
      9. End with a "License" section mentioning the type of license.
      After each point being covered, add a line break (\`\\n\`). eg:- 
      # Title line break
      Description line break
      ## Table of Contents line break 
      - Points for the respective sections 
      ## Getting Started line break 
      1. Steps for getting started line break 
      2. Steps for getting started and so on
  `;

  // Function to handle prompt submission
  const handlePromptSubmit = async () => {
    setLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      // Prepend the system instruction to the user prompt
      const finalPrompt = `${systemInstruction}\n\n${prompt}`;

      const result = await chatSession.sendMessage(finalPrompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setResponse("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`gemini text-${props.mode === 'black' ? 'white' : 'black'} gap-10 p-5`}
    >
      {/* Prompt Section */}
      <span className="text-lg font-bold text- mb-2 align-left">Prompt</span>
      <textarea
        className={`border-radius-50px form-control w-full p-2 border ${
          props.mode === "black"
            ? "bg-black text-white border-2 border-white"
            : "bg-white text-black border-2 border-black"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        style={{ borderRadius: '10px' }}
        rows="5"
        placeholder="Your Prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className={`mt-4 px-4 py-2 ${
          props.mode === "black" ? "bg-blue-500 text-white" : "bg-blue-700 text-black"
        } rounded-md`}
        onClick={handlePromptSubmit}
        disabled={loading}
      >
        {loading ? "Generating..." : "Submit"}
      </button>

      {/* Response Section */}
      <div className="mt-6">
        <span className="text-lg font-bold text- mb-2 align-left">Response</span>
        <div
          className={`form-control w-full p-4 border ${
            props.mode === "black"
              ? "bg-black text-white border-2 border-white"
              : "bg-white text-black border-2 border-black"
          } rounded-md`}
          style={{ borderRadius: '10px', minHeight: '100px' }}
        >
          {response || "Your response will appear here."}
        </div>
      </div>
    </div>
  );
}
