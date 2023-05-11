import React, { useEffect, useState } from 'react';

interface TextToSpeechProps {
  outputs: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ outputs }) => {
  const [text, setText] = useState('');

  const handleSpeakClick = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
    } else {
      console.error('Text-to-speech is not supported in this browser.');
    }
  };

  useEffect(() => {
    setText(outputs);
  }, [outputs]);

  useEffect(() => {
    handleSpeakClick();
  }, [text]);

  return (
    <div>
      {/* <p>{text}</p> */}
    </div>
  );
};

export default TextToSpeech;
