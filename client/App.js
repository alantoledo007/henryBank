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
import { Provider } from 'react-redux';
import store from './redux/store/index';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <NativeRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register-confirmation" component={RegisterConfirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dash" component={Dash} />
          <Route exact path="/register-step-two" component={RegisterStepTwo} />
          <Route exact path="/register-step-three" component={RegisterStepThree} />
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
