import React from 'react'

export default function Gemini(props) {
  return (
    <div className={`gemini text-${props.mode === 'black' ? 'white' : 'black'} gap-10 p-5`}>
          <span className="text-lg font-bold text- mb-2 align-left">Prompt</span>
          <textarea
            className={`border-radius-50px form-control w-full p-2 border ${
              props.mode === "black"
                ? "bg-black text-white border-2 border-white"
                : "bg-white text-black border-2 border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            style={{ borderRadius: '10px' }}
          rows="5"
          placeholder="Your Prompt here"
        />
      </div>
  )
}
