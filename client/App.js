import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Home from './components/Home';
import Register from './components/Register';
import RegisterConfirmation from './components/RegisterConfirmation';
import Login from './components/Login';
import Dash from './components/Dash';
import RegisterStepTwo from './components/RegisterStepTwo';
import RegisterStepThree from './components/RegisterStepThree';
import EmailVerifier from './components/EmailVerifier';
import PasswordReset from './components/PasswordReset/Index'
import Reset from './components/PasswordReset/Reset';
import SendMoney from './components/SendMoney';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Fox from './components/Fox';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <NativeRouter>
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
          <Route exact path="/send-money" component={SendMoney} />
        </NativeRouter>
      </Provider>
    </React.Fragment>
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
