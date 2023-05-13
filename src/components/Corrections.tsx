import React from 'react';

interface CorrectionsProps {
  texts: string;
  corrections: { bad: string; better: string[] }[];
}

const Corrections: React.FC<CorrectionsProps> = (props) => {
  return (
    <div>
      {props.corrections.map((error) => (
        <div key={error.bad}>
          <p>Error: {error.bad}</p>
          <p>Suggestions: {error.better.join(', ')}</p>
        </div>
      ))}
      <p>{props.texts}</p>
      {props.corrections.map((error) => {
        const words = props.texts.split(' ');
      const rrr =   error.better.join(', ')
        const newArray = words.map((element) =>
          element === error.bad ? rrr : element
        );

        console.log(newArray.join(' '));

        return <p key={error.bad}>Corrections: {newArray.join(' ')}</p>;
      })}
    </div>
  );
};

export default Corrections;
