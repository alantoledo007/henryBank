import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import { Provider } from 'react-redux';
import store from './redux/store/index';
import s from './components/style/styleSheet'
import colors from './components/style/colors'


// Context para validar las rutas
import { AuthContext } from "./components/Context/AuthContext";
// Validacion de rutas
import IndexRoutes from './components/Routes/Index';

import { emailVerify } from './redux/actions/email_verifier';

// componente de cargando
import { Splash } from './components/Splash'
// Rutas iniciales accesibles para cualquier usuario


export default function App({ auth, user }) {

  const [isLoading, setIsLoading] = useState(true);

  /*const [ userData, setUserData ] = useState({
    email: null, 
    emailVerifiedAt: null, 
    dataCompletedAt: null,
  });

   const authContext = React.useMemo(() => {
    return {
      signIn: ( data ) => {
        // console.log('context', data);
        setUserData({
          email: data.user.email,
          emailVerifiedAt: data.user.emailVerifiedAt,
          dataCompletedAt: data.user.dataCompletedAt,
        });
        setIsLoading(false);
      },
      changeData: ( data ) => {
        console.log(data)
        setUserData({
          email: data.email,
          emailVerifiedAt: data.emailVerifiedAt,
          dataCompletedAt: data.user.dataCompletedAt,
        });
        setIsLoading(false);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setEmail(null);
        setEmailVerifiedAt(null);
        setDataCompletedAt(null);
      }
    };
  }, []); */
  useEffect( () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if(isLoading) return <Splash />

  return (
    <>
      {/* <AuthContext.Provider value={authContext}> */}
        <Provider store={store}>           
          <StatusBar hidden={true} />
            <IndexRoutes />
        </Provider>
      {/* </AuthContext.Provider> */}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

