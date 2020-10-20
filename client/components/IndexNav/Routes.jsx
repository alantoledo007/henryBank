import React from "react";
import { View, Text } from "react-native";

//stack creators
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Componentes
import Fox from "../Fox";
import Home from "../Home";
import Register from "../Register";
import Login from "../Login";
import PasswordReset from "../PasswordReset/Index";
import Reset from "../PasswordReset/Reset";
import EmailVerifier from "../EmailVerifier";
import RegisterConfirmation from "../RegisterConfirmation";
import RegisterStepTwo from "../RegisterStepTwo";
import RegisterStepThree from "../RegisterStepThree";
// import Dash from "../DashboardNav/Index";

const screenConfig = {
  options: {
    header: () => false,
  },
};

export const Auth = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="PasswordReset" component={PasswordReset} />
      <AuthStack.Screen name="Reset" component={Reset} />
      <AuthStack.Screen name="EmailVerifier" component={EmailVerifier} />
    </AuthStack.Navigator>
  );
};

export const EmailVerify = () => {
  const EmailVerifyStack = createStackNavigator();
  return (
    <EmailVerifyStack.Navigator screenOptions={{ headerShown: false }}>
      <EmailVerifyStack.Screen name="EmailVerifier" component={EmailVerifier} />
    </EmailVerifyStack.Navigator>
  );
};

export const CompleteUserData = () => {
  const CompleteUserDataStack = createStackNavigator();
  return (
    <CompleteUserDataStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <CompleteUserDataStack.Screen
        name="RegisterConfirmation"
        component={RegisterConfirmation}
      />
      <CompleteUserDataStack.Screen
        name="RegisterStepTwo"
        component={RegisterStepTwo}
      />
      <CompleteUserDataStack.Screen
        name="RegisterStepThree"
        component={RegisterStepThree}
      />
    </CompleteUserDataStack.Navigator>
  );
};
