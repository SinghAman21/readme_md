import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Writer() {
  const [markdown, setMarkdown] = useState('');
  const [resizeDirection, setResizeDirection] = useState('horizontal');

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
    <div className={`flex px-8 h-full`}>
      <PanelGroup direction={resizeDirection}>
        {/* Raw Markdown Input */}
        <Panel minSize={20} defaultSize={50} collapsible className='overflow-auto'>
          <div className="writer h-full md:pb-28">
            <span className="text-base font-semibold">Raw</span>
            <textarea
              className="h-full mb-4 mt-2 rounded-lg "
              value={markdown}
              onChange={handleOnChange}
              placeholder="Enter your Markdown here"
            />
          </div>
        </Panel>
        <PanelResizeHandle className='md:mx-1 md:my-16 my-1 mx-16 bg-black/30 dark:invert 
        transition-colors ease-linear hover:bg-black/50 md:w-1 w-96 rounded-2xl md:h-96 h-2' />
        <Panel minSize={20} defaultSize={50} collapsible className='overflow-auto'>
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
    </div>

  );
}
