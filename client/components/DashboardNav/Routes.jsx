import React from "react";
import { View, Text } from "react-native";

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

export function Menu() {
    const MenuStack = createDrawerNavigator();
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen name="Dashboard" component={DashboardRoutes} />
            <MenuStack.Screen name="Recarga" component={Deposit} />
            <MenuStack.Screen name="Transferencia" component={SendMoney} />
            <MenuStack.Screen name="Contactos" component={Contacts} />
        </MenuStack.Navigator>
    );
}

export const DashboardRoutes = (props) => {
    const DashStack = createStackNavigator();
    return (
        <DashStack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                ...TransitionPresets.SlideFromRightIOS,
            }}
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
            screenOptions={{
                headerShown: false,
            }}
        >
            <ContactsTabStack.Screen component={Dash} name="Panel" />
            <ContactsTabStack.Screen component={Contacts} name="Mis contactos" />
        </ContactsTabStack.Navigator>
    );
};
