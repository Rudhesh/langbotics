import React from 'react';
import './Corrections.css';

interface CorrectionsProps {
  texts: string;
  corrections: { bad: string; better: string[] }[];
}

const Corrections: React.FC<CorrectionsProps> = (props) => {
  const { texts, corrections } = props;

  const applyCorrections = () => {
    let correctedText = texts;

    corrections.forEach((error) => {
      const regex = new RegExp(`\\b${error.bad}\\b`, 'gi');
      correctedText = correctedText.replace(regex, `<span class="error-word">${error.bad}</span>`);
    });

    return correctedText;
  };

  const renderHighlightedText = () => {
    const correctedText = applyCorrections();
    const parts = correctedText.split(/(<span class="error-word">[^<]*<\/span>)/);

    return parts.map((part, index) => {
      if (part.startsWith('<span class="error-word">')) {
        const errorWord = part.replace(/<\/?span[^>]*>/g, '');

        return (
          <span key={index} className="error-word">
            {errorWord}
          </span>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="corrections-container">
       <p className="user-text">{texts}</p>
      {corrections.map((error) => (
        <div key={error.bad} className="error-container">
          <p className="error-text">Error: {error.bad}</p>
          <p className="suggestions-text">
            Suggestions: {error.better.join(', ')}
          </p>
        </div>
      ))}
     <p className="user-text"> Corrections</p>
      <p className="corrections-text">
        {renderHighlightedText()}
      </p>
    </div>
  );
};

export default Corrections;
