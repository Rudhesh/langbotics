import React, { useEffect, useRef, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './ChatBot.css';
import TextToSpeech from './TextToSpeech';

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
);

const ChatBot = (props: any) => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (input: string) => {
    try {
      const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: input }],
      });
      const message = response.data.choices[0].message;
      if (message && message.role === 'assistant' && message.content) {
        setOutput(message.content);
      }
    } catch (error) {
      console.log(error);
      setOutput('Error: Unable to process your request at this time. Please try again later.');
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

  useEffect(() => {
    inputRef.current?.focus();
    handleLine(props.output1);
  }, [props.output1]);

  return (
    <div>
     
      {props.output1 ? <div></div> : <div className="input-container">
        {/* <p className="label">Input:</p> */}
        <input
          type="text"
          value={input}
          placeholder="Type something..."
          onKeyDown={handleKeyDown}
          className="transparent-input"
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>}
     
      <div className="output-container">
        <p className="label">Output:</p>
        <p className="output">{output}</p>
       

      </div>
      <TextToSpeech outputs = {output} />
    </div>
  );
};

export default ChatBot;
