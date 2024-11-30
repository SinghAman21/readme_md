import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import {ClipboardIcon} from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import Gemini from './Gemini';

export default function Writer() {
  const [markdown, setMarkdown] = useState('');
  const [resizeDirection, setResizeDirection] = useState('horizontal');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const handleResize = () => {
      setResizeDirection(window.innerWidth < 768 ? 'vertical' : 'horizontal');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle dynamic bullet/numbered point behavior in textarea
  const handleOnChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const textarea = event.target;
      const value = textarea.value;
      const cursorPosition = textarea.selectionStart;

      // Split into lines and find the current line
      const lines = value.split('\n');
      const currentLineIndex = value.substring(0, cursorPosition).split('\n').length - 1;
      const currentLine = lines[currentLineIndex];

      if (currentLine && currentLine.trim().startsWith('-')) {
        event.preventDefault();
        const beforeCursor = value.substring(0, cursorPosition);
        const afterCursor = value.substring(cursorPosition);
        const updatedValue = `${beforeCursor}\n- ${afterCursor}`;
        setMarkdown(updatedValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
        }, 0);
      } else if (/^\d+\.\s/.test(currentLine)) {
        event.preventDefault();
        const number = parseInt(currentLine.match(/^\d+/)[0], 10);
        const beforeCursor = value.substring(0, cursorPosition);
        const afterCursor = value.substring(cursorPosition);
        const updatedValue = `${beforeCursor}\n${number + 1}. ${afterCursor}`;
        setMarkdown(updatedValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorPosition + `${number + 1}. `.length;
        }, 0);
      }
    }
  };

  return (
    <div className={`flex px-8 h-full h-[91vh]`}>
      <PanelGroup direction={resizeDirection}>
        {/* Raw Markdown Input */}
        <Panel minSize={20} defaultSize={50} collapsible className="overflow-auto">
          <div className="writer h-full md:pb-28 relative">
            <span className="text-base font-semibold">Raw</span>
            <textarea
              className="h-full mb-4 mt-2 rounded-lg pr-10"
              value={markdown}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your Markdown here"
            />
          <ClipboardIcon 
            className='h-6 w-6 z-50 absolute top-12 right-4 hover:cursor-pointer dark:text-white text-black'
            onClick={handleCopy}
          />

          {/* Notification Box */}
          {isCopied && (
            <motion.div
              className="absolute top-20 right-4 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-opacity duration-500"
              style={{ opacity: isCopied ? 1 : 0 }}
              initial={{  opacity: 0 }}
              animate={{  opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'linear' }}
            >
              Content copied!
            </motion.div>
          )}
        </div>
        </Panel>
        <PanelResizeHandle
          className="md:mx-1 md:my-16 my-1 mx-16 bg-black/30 dark:invert 
        transition-colors ease-linear hover:bg-black/50 md:w-1 w-96 rounded-2xl md:h-96 h-2"
        />
        <Panel minSize={20} defaultSize={50} collapsible className="overflow-auto">
          {/* Preview */}
          <div className="preview h-full md:pb-28">
            <span className="text-base font-semibold dark:text-light text-black">Preview</span>
            <div
              className={`mt-[2px] rounded-lg mb-4 form-control w-full px-5 py-3 overflow-auto h-full dark:bg-[#0a0c0e]/50 dark:text-white bg-blue-200/50 border-1 duration-500`}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </Panel>
      </PanelGroup>
      <Gemini setMarkdown={setMarkdown}/>
    </div>
  );
}
