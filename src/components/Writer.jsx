import React, { useState } from "react";
import "../index.css"; // Assuming your CSS file is set up
import ReactMarkdown from "react-markdown";
import Gemini from "./Gemini";

export default function Writer(props) {
  const [markDown, setMarkDown] = useState("");

  const handleOnChange = (event) => {
    setMarkDown(event.target.value);
  };

  return (
    <>
      {/* Raw and Preview Section */}
      <div
        className={`flex text-${
          props.mode === "black" ? "white" : "black"
        } gap-10 p-5`}
      >
        {/* Raw Input */}
        <div className="writer w-1/2">
          <span
            className={`text-lg font-bold mb-2 ${
              props.mode === "black" ? "text-white" : "text-black"
            }`}
          >
            Raw
          </span>
          <textarea
            className={`form-control w-full p-2 border ${
              props.mode === "black"
                ? "bg-black text-white border-2 border-white"
                : "bg-white text-black border-2 border-black"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            style={{ borderRadius: '10px' }}
            value={markDown}
            onChange={handleOnChange}
            placeholder="Enter your Markdown here"
            rows="20"
          />
        </div>
        {/* Markdown Preview */}
        <div className="preview w-1/2">
          <span
            className={`text-lg font-bold mb-2 ${
              props.mode === "black" ? "text-white" : "text-black "
            }`}
          >
            Preview
          </span>
          <div
            className={`form-control ${
              props.mode === "black"
                ? "bg-black text-white border-2 border-white"
                : "bg-white text-black border-2 border-black"
            } w-full pl-2 border rounded-md overflow-auto h-[70vh]`}
            style={{ borderRadius: '10px' }}
          >
            <ReactMarkdown>{markDown}</ReactMarkdown>
          </div>
        </div>
      </div>
      <Gemini mode={props.mode} />
    </>
  );
}
