import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import Chat from './src/Chat';
import {SafeAreaView} from 'react-native-safe-area-context';
const URL = 'http://127.0.0.1:8080';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, [URL]);

  return (
    <SafeAreaView>
      <Chat serverUrl={URL} />
    </SafeAreaView>
  );
};

export default App;
