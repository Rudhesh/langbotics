import { useEffect, useState } from 'react';
import textgears from 'textgears-api';
import Corrections from './Corrections';

interface ErrorCheckerProps {
  output1: string;
}

const ErrorChecker: React.FC<ErrorCheckerProps> = (props) => {
  const [response, setResponse] = useState<{ errors: { bad: string; better: string[] }[] } | null>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    setInput(props.output1 || '');
  }, [props.output1]);

  useEffect(() => {
    if (input.trim() !== '') {
      const textgearsApi = textgears('QES5wjQmL2eYtoGF', { language: 'en-US', ai: false });
      textgearsApi
        .checkGrammar(input)
        .then((data) => {
          console.log("data",data.response)
          setResponse(data.response);
        })
        .catch((err: Error) => {
          // Handle error
        });
    }
  }, [input]);

  if (!response) {
    return <div>Loading...</div>;
  }
const error = response.errors
  return (
    <div>
     
       <Corrections corrections ={error} texts = {input}/>
     
    </div>
  );
};

export default ErrorChecker;
