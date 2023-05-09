import React from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import VoiceRecognition from './components/VoiceRecognition';

const App: React.FC = () =>{
  console.log("first")
  const handleText = (text: string) => {
    // console.log({text});
    return text
    // Do something with the recognized text
    
  }
 

  return (
    <div className="App">
      <header className="App-header">
      <VoiceRecognition onResult={handleText}/>
       {/* <ChatBot /> */}
      </header>
    </div>
  );
}

export default App;
