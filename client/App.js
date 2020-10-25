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

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) return <Loading />

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          {/* AppNavigation contiene la lógica de navegación */}
          <AppNavigation />
        </NavigationContainer>
      </Provider>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}