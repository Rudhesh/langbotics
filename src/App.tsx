import React from 'react';
import './App.css';
import VoiceRecognition from './components/VoiceRecognition';
import YourComponent from './components/ErrorChecker';

const App: React.FC = () =>{
  const handleText = (text: string) => {
    console.log({text});
    return text
    // Do something with the recognized text

  }


  return (
    <div className="App">
      
      <header className="App-header">

      <h1 className="title">Langbotics App</h1>
      <div><VoiceRecognition onResult={handleText}/></div>

      </header>
    </div>
  );
}

export default App;
