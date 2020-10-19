import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './redux/store/index';

//Componentes
import Fox from './components/Fox';
import Home from './components/Home';
import Register from './components/Register';
import EmailVerifier from './components/EmailVerifier';
import RegisterConfirmation from './components/RegisterConfirmation';
import RegisterStepTwo from './components/RegisterStepTwo';
import RegisterStepThree from './components/RegisterStepThree';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset/Index'
import IndexReset from './components/PasswordReset/Index';
import Reset from './components/PasswordReset/Reset';
import Dash from './components/DashboardNav/Index';

//navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//For Light/Dark Mode
import { AppearanceProvider } from 'react-native-appearance';

const Stack = createStackNavigator();

export default function App() {
  const screenConfig = {
    options:{
      header:() => false
    }
  }
return (
  <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Home" component={Home} {...screenConfig} />
              <Stack.Screen name="Dash" component={Dash} {...screenConfig} />

              <Stack.Screen name="IndexReset" component={IndexReset} {...screenConfig} />
              <Stack.Screen name="Reset" component={Reset} {...screenConfig} />
              <Stack.Screen name="Login" component={Login} {...screenConfig} />
              <Stack.Screen name="Register" component={Register} {...screenConfig} />
            </Stack.Navigator>
          </NavigationContainer>
      {/*<NativeRouter>
          <Fox />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register-confirmation" component={RegisterConfirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dash" component={Dash} />
          <Route exact path="/passwordreset" component={PasswordReset} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/register-step-two" component={RegisterStepTwo} />
          <Route exact path="/register-step-three" component={RegisterStepThree} />
          <Route exact path="/email-verifier" component={EmailVerifier} />
          <Route exact path="/deposit" component={Deposit}/>
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/send-money" component={SendMoney} /> 
        </NativeRouter>*/}
    </Provider>
  );
}