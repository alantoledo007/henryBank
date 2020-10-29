import React from "react";
import { View, Text, StatusBar, useColorScheme } from "react-native";

//stack creators
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dash from "./Dash";
import Deposit from "./Deposit/Deposit";
import SendMoney from "./SendMoney";
import Contacts from "./Contacts/Index";
import DrawerContent from "./DrawerContent";
import Graphics from "./graphics";
import Transactions from './Transactions/Transactions';

import Cuentas from './Cuentas';

import Profile from './Profile/Index';
import ChangeEmail from './ChangeEmail/Index'

// UI
import { Button, hbn, darkColors, lightColors, defaultColors} from '../Quantum';
import IonIcon from "react-native-vector-icons/Ionicons";
import Logout from "./Logout";


export const navigationOptionsHeader = (theme = 'light') => {
    return ({ title, navigation}) => {return {
        headerShown: true,
        title: title,
        headerTitleAlign: "center",
        headerLeft: () => (
            <Button
                outline={theme === 'dark' ? '#fff':'#f0f0f0'}
                color="transparent"
                textStyle={
                    {color: (theme === 'dark' ? '#fff': defaultColors.primary)}
                }
                style={{
                    marginLeft: 15,
                    paddingVertical: 8,
                    borderColor: theme === 'dark' ? 'rgba(255,255,255, .2)':'#f0f0f0'
                }}
                onPress={() => navigation.toggleDrawer()}
                label={<IonIcon name="ios-menu" style={{ fontSize: 20 }} />}
            />
        ),
        headerTintColor:theme === 'dark' ? '#fff':'#000',
        headerStyle: {
            backgroundColor: theme === 'dark' ? '#454545':'#fff'
          },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    }};

}


export function Menu() {
    const MenuStack = createDrawerNavigator();
    return (
        <MenuStack.Navigator drawerContent={ props => <DrawerContent {...props}/>} >
            <MenuStack.Screen name="Dashboard" component={DashboardRoutes} />
            <MenuStack.Screen name="Cuentas" component={CuentasRoute} />
            <MenuStack.Screen name="Recarga" component={DepositRoute} />
            <MenuStack.Screen name="Transferencia" component={SendMoneyRoute} />
            <MenuStack.Screen name="Contactos" component={ContactRoute} />
            <MenuStack.Screen name="Logout" component={LogoutRoutes} />
            <MenuStack.Screen name="Transferencias" component={TransactionsRoute}/>
            <MenuStack.Screen name="Estadísticas" component={GraphicsRoute} />
        </MenuStack.Navigator>
    );
}
const LogoutRoutes = () => {
    const LogoutStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <LogoutStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <LogoutStackNavigator.Screen name='Recarga' component={Logout} />
        </LogoutStackNavigator.Navigator>
    )
}
export const DepositRoute = () => {
    const DepositoStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <DepositoStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <DepositoStackNavigator.Screen name='Recarga' component={Deposit} />
        </DepositoStackNavigator.Navigator>
    )
}

export const GraphicsRoute = () => {
    const GraphicsStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <GraphicsStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <GraphicsStackNavigator.Screen name='Estadísticas' component={Graphics} />
        </GraphicsStackNavigator.Navigator>
    )
}

export const SendMoneyRoute = () => {
    const SendMoneyStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <SendMoneyStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <SendMoneyStackNavigator.Screen name='Transferencia' component={SendMoney} />
            <SendMoneyStackNavigator.Screen name='Dashboard' component={Dash} />
        </SendMoneyStackNavigator.Navigator>
    )
}

export const ContactRoute = () => {
    const ContactStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <ContactStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <ContactStackNavigator.Screen name='Contactos' component={Contacts} />
        </ContactStackNavigator.Navigator>
    )
}

export const TransactionsRoute = () => {
    const TransactionsStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <TransactionsStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <TransactionsStackNavigator.Screen name='Transferencias' component={Transactions} />
        </TransactionsStackNavigator.Navigator>
    )
}
export const CuentasRoute = () => {
    const CuentasStackNavigator = createStackNavigator();
    const theme = useColorScheme();
    return (
        <CuentasStackNavigator.Navigator screenOptions={navigationOptionsHeader(theme)}>
            <CuentasStackNavigator.Screen name='Mis cuentas' component={Cuentas} />
        </CuentasStackNavigator.Navigator>
    )
}

export const DashboardRoutes = (props) => {
    const DashStack = createStackNavigator();
    const theme = useColorScheme();
    return (
        <DashStack.Navigator
        screenOptions={navigationOptionsHeader(theme)}
        >
            <DashStack.Screen component={Dash} name="Panel" />
            <DashStack.Screen component={Graphics} name="Estadísticas" />
            <DashStack.Screen component={Transactions} name="Transacciones" />
            <DashStack.Screen component={Contacts} name="Contactos" />
            <DashStack.Screen component={Profile} name="Mi Perfil"/>
            <DashStack.Screen component={ChangeEmail} name="Cambiar Email"/>
        </DashStack.Navigator>
    );
};

export const ContactsRoute = (props) => {
    const ContactsTabStack = createMaterialTopTabNavigator();
    const theme = useColorScheme();
    return (
        <ContactsTabStack.Navigator
            tabBarPosition="bottom"
        >
            <ContactsTabStack.Screen component={Dash} name="Panel" />
            <ContactsTabStack.Screen component={Contacts} name="Mis contactos" />
        </ContactsTabStack.Navigator>
    );
};
