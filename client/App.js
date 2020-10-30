import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { StatusBar } from 'expo-status-bar';

import { toastConfig } from './components/Quantum';
import Toast from 'react-native-toast-message';

//navigation
import 'react-native-gesture-handler';
import AppNavigation from './components/IndexNav/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Loading from './components/Loading'

//Kitten UI
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import useColorScheme from './components/useCustomTheme';
import { default as evaTheme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

function UIKittenProvider() {
  const theme = useColorScheme();
  return (
      <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva[theme], ...evaTheme }}>
              <NavigationContainer>
                  {/* AppNavigation contiene la lógica de navegación */}
                  <AppNavigation />
              </NavigationContainer>
              <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
          </ApplicationProvider>
      </>
  )
}


export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />

  return (
    <Provider store={store}>
      <UIKittenProvider />
    </Provider>
  );
}