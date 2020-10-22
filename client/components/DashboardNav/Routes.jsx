import React from "react";
import { View, Text, StatusBar } from "react-native";

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

// UI
import { Button, hbn } from '../Quantum';
import IonIcon from "react-native-vector-icons/Ionicons";
import Logout from "./Logout";


export const navigationOptionsHeader = ({ title, navigation,  }) => {
    return {
        headerShown: true,
        title: title,
        headerTitleAlign: "center",
        headerLeft: () => (
            <Button
                color='light'
                textStyle={
                    hbn('text-primary')
                }
                style={{
                    marginLeft: 15,
                }}
                onPress={() => navigation.toggleDrawer()}
                label={<IonIcon name="ios-menu" style={{ fontSize: 20 }} />}
            />
        ),
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
    };

}


export function Menu() {
    const MenuStack = createDrawerNavigator();
    return (
        <MenuStack.Navigator drawerContent={ props => <DrawerContent {...props}/>} >
            <MenuStack.Screen name="Dashboard" component={DashboardRoutes} />
            <MenuStack.Screen name="Recarga" component={DepositRoute} />
            <MenuStack.Screen name="Transferencia" component={SendMoneyRoute} />
            <MenuStack.Screen name="Contactos" component={ContactRoute} />
            <MenuStack.Screen name="Logout" component={Logout} />
            <MenuStack.Screen name="Estadística" component={Graphics} />
            <MenuStack.Screen name="Transacciones" component={Transactions}/>
        </MenuStack.Navigator>
    );
}
export const DepositRoute = () => {
    const DepositoStackNavigator = createStackNavigator();
    return (
        <DepositoStackNavigator.Navigator screenOptions={navigationOptionsHeader}>
            <DepositoStackNavigator.Screen name='Recarga' component={Deposit} />
        </DepositoStackNavigator.Navigator>
    )
}
export const SendMoneyRoute = () => {
    const SendMoneyStackNavigator = createStackNavigator();
    return (
        <SendMoneyStackNavigator.Navigator screenOptions={navigationOptionsHeader}>
            <SendMoneyStackNavigator.Screen name='Transferencia' component={SendMoney} />
        </SendMoneyStackNavigator.Navigator>
    )
}

export const ContactRoute = () => {
    const ContactStackNavigator = createStackNavigator();
    return (
        <ContactStackNavigator.Navigator screenOptions={navigationOptionsHeader}>
            <ContactStackNavigator.Screen name='Contactos' component={Contacts} />
        </ContactStackNavigator.Navigator>
    )
}

export const DashboardRoutes = (props) => {
    const DashStack = createStackNavigator();
    return (
        <DashStack.Navigator
        screenOptions={navigationOptionsHeader}
        >
            <DashStack.Screen component={ContactsRoute} name="Panel" />
            {/* <DashStack.Screen component={Contacts} name="Contactos" /> */}
        </DashStack.Navigator>
    );
};

export const ContactsRoute = (props) => {
    const ContactsTabStack = createMaterialTopTabNavigator();
    return (
        <ContactsTabStack.Navigator
            tabBarPosition="bottom"
        >
            <ContactsTabStack.Screen component={Dash} name="Panel" />
            <ContactsTabStack.Screen component={Contacts} name="Mis contactos" />
        </ContactsTabStack.Navigator>
    );
};
