import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { StatusBar } from 'expo-status-bar';

//navigation
import 'react-native-gesture-handler';
import AppNavigation from './components/IndexNav/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

//For Light/Dark Mode
import { AppearanceProvider } from 'react-native-appearance';

export default function App() {
  const screenConfig = {
    options: {
      header: () => false
    }
  }
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        {/* AppNavigation contiene la lógica de navegación */}
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
  /*<NativeRouter>
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
        </NativeRouter>*/
}