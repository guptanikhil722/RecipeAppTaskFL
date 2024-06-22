import { useState, useEffect } from 'react';
import  Voice  from '@react-native-voice/voice';

const useVoiceRecognition = (query:any, setQuery:any) => {
  const [voiceRecognitionEnabled, setVoiceRecognitionEnabled] = useState(false);
//   const [query, setQuery] = useState('');

  useEffect(() => {
    Voice.onSpeechResults=((event:any) => {
      console.log('text>>>', event.value[0])
      setQuery(event.value[0]);
    });
  }, [query]);

  const startVoiceRecognition = () => {
    Voice.start('en-US').then(()=>{
        setQuery('listening...')
    });
  };

  const stopVoiceRecognition = () => {
    Voice.stop().then(()=>{
        setQuery('')
    });
  };

  return { startVoiceRecognition, stopVoiceRecognition, voiceRecognitionEnabled };
};

export default useVoiceRecognition;