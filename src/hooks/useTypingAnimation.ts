import { useState, useEffect } from 'react';

export function useTypingAnimation(text: string, speed: number = 100, loop: boolean = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        setTypingSpeed(speed / 2);

        if (currentIndex === 0) {
          setIsDeleting(false);
          setTypingSpeed(speed);
        }
      } else {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        setTypingSpeed(speed);

        if (currentIndex === text.length) {
          if (loop) {
            setTypingSpeed(1000); // Pause at the end
            setTimeout(() => {
              setIsDeleting(true);
            }, 1000);
          } else {
            return;
          }
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text, speed, loop, typingSpeed]);

  return displayedText;
}
