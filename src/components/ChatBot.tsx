import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai"
// import styled from 'styled-components';
import "./ChatBot.css"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
)

const ChatBot = (props: any) => {
  const [input, setInput] = useState<string | undefined>("");
  const [output, setOutput] = useState<string | undefined>("");
  const [voice, setVoice] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (input: string) => {
    try {
      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      });
      console.log(response.data.choices[0].message?.content);
      setOutput(response.data.choices[0].message?.content);
    } catch (error) {
      console.log(error);
      setOutput("Error: Unable to process your request at this time. Please try again later.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleLine(event.currentTarget.value);
    }
  };

  

  const handleLine = (input: string) => {
    setInput(input);
    handleInput(input);
  };

  const handleChange = () => {
    setVoice(props.voiceModule());
  }

useEffect(() => {
  handleChange()
  handleLine(voice)
  inputRef.current?.focus();
}, [props.voiceModule()])

// console.log(props.voiceModule())
console.log({voice})



  return (
 
  

<div className="container">
<h1 className="title">Langbotics App</h1>
<div className="input-container">
  <p className="label">Input:</p>
  <input
    type="text"
    value = {voice}
    placeholder="Type something..."
    // onKeyDown={handleKeyDown}
    className="transparent-input"
    ref={inputRef}
    onChange={(e) => handleLine(voice)}
  />
</div>
<div className="output-container">
  <p className="label">Output:</p>
  <p className="output">{output}</p>
</div>
</div>
  );
};

export default ChatBot;
