import React, {useEffect} from 'react';
import { Text } from 'react-native';
import {setCustomText} from 'react-native-global-props';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './navigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';
const App = () => {
  const customTextProps = {
    style: {
      fontFamily: 'Rubik-Medium',
    },
  };

  useEffect(() => {
    return () => {
      setCustomText(customTextProps);
    };
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
