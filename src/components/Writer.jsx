import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Gemini from './Gemini';

export default function Writer({ mode }) {
  const [markdown, setMarkdown] = useState('');

  // Handle dynamic bullet/numbered point behavior in textarea
  const handleOnChange = (event) => {
    const value = event.target.value;
    const lines = value.split('\n');
    const lastLine = lines[lines.length - 1];

    // Auto-add next bullet or numbered point
    if (lastLine.startsWith('- ')) {
      lines.push('- ');
    } else if (/^\d+\.\s/.test(lastLine)) {
      const number = parseInt(lastLine.match(/^\d+/)[0], 10);
      lines.push(`${number + 1}. `);
    }

    setMarkdown(lines.join('\n'));
  };

  return (
    <div className={`flex text-${mode === 'black' ? 'white ' : 'black'} gap-10 p-5 `}>
      {/* Raw Markdown Input */}
      <div className="writer w-1/2">
        <span className="text-lg font-bold mb-2">Raw</span>
        <textarea
          className={`form-control w-full p-2 rounded-md focus:outline-none focus:ring-2 ${
            mode === 'black'
              ? 'bg-gray-800 text-white focus:ring-blue-500 border-2 border-white'
              : 'bg-gray-200 text-black focus:ring-blue-500 border-2 border-black'
          }`}
          rows="20"
          cols="50"
          value={markdown}
          onChange={handleOnChange}
          placeholder="Enter your Markdown here"
        />
      </div>
      {/* Markdown Preview */}
      <div className="preview w-20vw">
        <span className="text-lg font-bold mb-2">Preview</span>
        <div
          className={`form-control w-full p-2 rounded-md overflow-auto h-[70vh] ${
            mode === 'black' ? 'bg-gray-900 text-white border-2 border-white' : 'bg-gray-100 text-black border-2 border-black'
          }`}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
      <Gemini mode={mode} setMarkdown={setMarkdown} />
    </div>
  );
}
