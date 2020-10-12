import React from 'react'
import Home from '../../components/Home'
import Login from '../../components/Login';
import RegisterConfirmation from '../../components/RegisterConfirmation';
import Register from '../../components/Register';
import RegisterStepTwo from '../../components/RegisterStepTwo';
import RegisterStepThree from '../../components/RegisterStepThree';
import EmailVerifier from '../../components/EmailVerifier';
import PasswordReset from '../../components/PasswordReset/Index'
import Reset from '../../components/PasswordReset/Reset';
import Dash from '../../components/Dash';
// Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions = {{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
  }}>
    <AuthStack.Screen name="Home" component={Home} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register}/>
    <AuthStack.Screen name="Reset" component={Reset} />
    <AuthStack.Screen name="PasswordReset" component={PasswordReset} /> 

  </AuthStack.Navigator>
);
// Ruta para confirmar el email
const EmailVerifierStack = createStackNavigator();
export const EmailVerifierStackScreen = () => (
  <EmailVerifierStack.Navigator screenOptions = {{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
  }}>
    <EmailVerifierStack.Screen name='EmailVerifier' component={EmailVerifier} />
  </EmailVerifierStack.Navigator>
)
// Rutas de usuario que tiene que confirmar informacion
const RegisterStack = createStackNavigator();
export const RegisterStackScreen = () => (
  <RegisterStack.Navigator screenOptions = {{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
  }}>
    <RegisterStack.Screen name="Register-confirmation" component={RegisterConfirmation} />               
    <RegisterStack.Screen name="Register-step-two" component={RegisterStepTwo} />
    <RegisterStack.Screen name="Register-step-three" component={RegisterStepThree} />
  </RegisterStack.Navigator>
)
// Rutas de usuario logueado
const UserDrawer = createDrawerNavigator();
export const UserDrawerScreen = () => (
  <UserDrawer.Navigator  initialRouteName="Dash"  screenOptions={{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
  }}>
    <UserDrawer.Screen name="Dash" component={Dash} />
  </UserDrawer.Navigator>
);