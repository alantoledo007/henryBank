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
import Reset from './components/PasswordReset/Reset';
import Dash from './components/Dash';
import Deposit from './components/Deposit';

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
          <Route exact path="/deposit" component={Deposit}/>
        </NativeRouter>
      </Provider>
    </React.Fragment>
  );
}