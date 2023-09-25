import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  textArray: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseBeforeErasing?: number;
  cursorChar?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  textArray,
  typingSpeed = 800, // 0.8 segundos por letra
  erasingSpeed = 500, // 0.5 segundos por letra (borrado)
  pauseBeforeErasing = 30000, // 30 segundos de espera antes de borrar
  cursorChar = '|',
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isErasing) {
        // Erasing text
        setCurrentText((prevText) => prevText.slice(0, prevText.length - 1));

        if (currentText === '') {
          // Finished erasing, move to the next text
          setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
          setIsErasing(false);

          // Wait before starting to type again
          setTimeout(() => {
            setIsErasing(true);
          }, pauseBeforeErasing);
        }
      } else if (currentText === textArray[currentIndex]) {
        // All characters typed, start erasing
        setIsErasing(true);
      } else {
        // Type the next character
        setCurrentText((prevText) =>
          textArray[currentIndex].slice(0, prevText.length + 1)
        );
      }
    }, isErasing ? erasingSpeed : typingSpeed);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentText, currentIndex, textArray, typingSpeed, erasingSpeed, isErasing, pauseBeforeErasing]);

  return (
    <span>
      {currentText}
      {cursorChar}
    </span>
  );
};

export default Typewriter;
