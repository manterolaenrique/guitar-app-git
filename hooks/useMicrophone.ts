import { useState, useEffect } from 'react';

export function useMicrophone() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const request = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);
    } catch (err) {
      console.error('No se pudo acceder al micrófono', err);
    }
  };
  
  useEffect(() => {
    request();
  }, []);

  return { stream, request };
}