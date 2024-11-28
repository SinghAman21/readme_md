import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowsPointingOutIcon, BoltIcon, CheckCircleIcon, CodeBracketIcon, DocumentTextIcon, EyeIcon, LightBulbIcon, LinkIcon, PhotoIcon, TableCellsIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import { IoCloudDownloadOutline } from 'react-icons/io5';

export default function Gemini({ setMarkdown }) {
  const [prompt, setPrompt] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

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
    <motion.div
      className="fixed bottom-6 w-full flex items-end justify-center px-4"
      style={{ zIndex: 100 }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="w-11/12 lg:w-2/3 relative flex items-center justify-center">
        <motion.div
          className="drawer absolute bottom-0 left-0 w-full h-full rounded-3xl bg-white/20 dark:bg-black/80 shadow-xl transition-all duration-500 ease-in-out backdrop-blur-3xl hidden md:block"
          style={{ height: isHovering ? '450px' : '0px', overflow: 'hidden' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovering && (
            <motion.div
              className="flex flex-col space-y-6 px-6 pt-4"
              initial={{  opacity: 0 }}
              animate={{  opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: 'linear' }}
            >
              <div className="top flex items-center justify-between">
                <h1 className='font-medium text-lg'>Toolbox</h1>
                <div className="flex items-center justify-center gap-3">
                  <button>
                    <ArrowsPointingOutIcon className="h-5 w-5" />
                  </button>
                  {/* <button>
                    <XMarkIcon className="h-6 w-6 hover:text-red-500 transition-colors " onClick={handleMouseLeave} />
                  </button> */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ToolCard
                  title="Text Generation"
                  description="Generate text based on your prompt."
                  icon={<DocumentTextIcon className="h-6 w-6 text-blue-500" />}
                />
                <ToolCard
                  title="Code Generation"
                  description="Generate code based on your prompt."
                  icon={<CodeBracketIcon className="h-6 w-6 text-yellow-500" />}
                />
                <ToolCard
                  title="Image Generation"
                  description="Generate images based on your prompt."
                  icon={<PhotoIcon className="h-6 w-6 text-green-500" />}
                />
                <ToolCard
                  title="Table Generation"
                  description="Generate tables based on your prompt."
                  icon={<TableCellsIcon className="h-6 w-6 text-purple-500" />}
                />
                <ToolCard
                  title="Link Generation"
                  description="Generate links based on your prompt."
                  icon={<LinkIcon className="h-6 w-6 text-indigo-500" />}
                />
                <ToolCard
                  title="Checklist Generation"
                  description="Generate checklists based on your prompt."
                  icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
                />
                <ToolCard
                  title="Idea Generation"
                  description="Generate ideas based on your prompt."
                  icon={<LightBulbIcon className="h-6 w-6 text-yellow-500" />}
                />
                <ToolCard
                  title="Preview"
                  description="Preview the generated content."
                  icon={<EyeIcon className="h-6 w-6 text-blue-500" />}
                />
              </div>
            </motion.div>
          )}
        </motion.div>



        <motion.textarea
          id="prompt"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => {
            handleMouseLeave();
            setPrompt(e.target.value)
          }}
          className="z-10 cursor-pointer focus:cursor-text active:cursor-text focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/10 focus:border-transparent backdrop-blur-3xl rounded-3xl"
          rows={1}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <button className="btn dark:bg-light bg-black p-3 rounded-full border border-solid border-black/50 
      dark:border-white/10 ml-2 z-10">
        <BoltIcon className='h-6 w-6 text-gray-300 dark:text-black' />
      </button>
    </motion.div>
  );
}


const ToolCard = ({ title, description, icon }) => (
  <div className="flex items-center p-3 bg-gray-100 dark:bg-black  rounded-lg hover:opacity-80 cursor-pointer transition-opacity">
    <div className="icon-container flex-shrink-0 mr-3">{icon}</div>
    <div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);
