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
import Graphics from "./graphics";

// UI
import { Button, hbn } from '../Quantum';
import IonIcon from "react-native-vector-icons/Ionicons";


export const navigationOptionsHeader = ({ navigation }) => {
    return {
        headerShown: true,
        title: false,
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
        <MenuStack.Navigator
            initialRouteName="Dashboard"           
        >
            <MenuStack.Screen name="Dashboard" component={DashboardRoutes} />
            <MenuStack.Screen name="Recarga" component={Deposit} />
            <MenuStack.Screen name="Transferencia" component={SendMoney} />
            <MenuStack.Screen name="Contactos" component={Contacts} />
            <MenuStack.Screen name="Estadística" component={Graphics} />
        </MenuStack.Navigator>
    );
}

export const DashboardRoutes = (props) => {
    const DashStack = createStackNavigator();
    return (
        <DashStack.Navigator
        screenOptions={navigationOptionsHeader}
        >
            <DashStack.Screen component={ContactsRoute} name="Dashboard" />
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
