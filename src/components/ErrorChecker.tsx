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

      const textgearsApi = textgears(process.env.REACT_APP_TEXT_GEARS_API, { language: 'en-US', ai: false });
      textgearsApi
        .checkGrammar(input)
        .then((data) => {
          console.log("data",data.response)
          setResponse(data.response);
        })
        .catch((err: Error) => {
          // Handle error
          console.log(error);
          setResponse({ errors: [{ bad: err.message, better: [] }] });

        });
    }
  }, [input]);

  if (!response) {
    return <p >Use me to check the Grammar</p>;
  }
const error = response.errors
  return (
    <div>
     
       <Corrections corrections ={error} texts = {input}/>
     
    </div>
  );
};

export default ErrorChecker;
