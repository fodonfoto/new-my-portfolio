import type { RefObject } from 'react';
import { useEffect } from 'react';

interface UseAutoResizeTextareaProps {
  minHeight?: number;
  maxHeight?: number;
}

export function useAutoResizeTextarea({ 
  minHeight = 0, 
  maxHeight = Number.POSITIVE_INFINITY 
}: UseAutoResizeTextareaProps = {}) {
  const adjustHeight = (reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (reset) {
      textarea.style.height = 'auto';
      return;
    }

    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const textareaRef = {} as RefObject<HTMLTextAreaElement>;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => adjustHeight();
    textarea.addEventListener('input', handleInput);
    
    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, [minHeight, maxHeight, adjustHeight, textareaRef]);

  return { textareaRef, adjustHeight };
}
