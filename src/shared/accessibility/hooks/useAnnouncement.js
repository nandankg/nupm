import { useState, useCallback } from 'react';

export const useAnnouncement = (initialMessage = '') => {
  const [message, setMessage] = useState(initialMessage);

  const announce = useCallback((newMessage, type = 'polite') => {
    if (type === 'assertive') {
      setMessage('');
      setTimeout(() => setMessage(newMessage), 10);
    } else {
      setMessage(newMessage);
    }
  }, []);

  const clear = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    announce,
    clear,
  };
};