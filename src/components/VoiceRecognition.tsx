import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ChatBot from './ChatBot';
import "./VoiceRecognition.css"

interface VoiceRecognitionProps {
  onResult: (text: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (!isListening) {
      SpeechRecognition.startListening();
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  }

  // Call the onResult prop with the recognized transcript
  if (transcript) {
    onResult(transcript);
  }

  const voiceModule = () => {
    console.log({transcript})
return transcript
  }

  useEffect(() => {
    voiceModule()
   }, [transcript])

  return (
    <div className="container">
       <ChatBot voiceModule={voiceModule} />
      <button className="listen-btn" onClick={handleListen}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div className="input-container">
      <p className="label">Input:</p>
      <p className="transcript">{transcript}</p>
      </div>
     
     
    </div>
  );
}

export default VoiceRecognition;
