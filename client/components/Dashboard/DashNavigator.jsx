import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Contacts } from "./Contacts";
const Tab = createMaterialBottomTabNavigator();
// iconos
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// componentes
import Dash from './Dash';
import MisDatos from './MisDatos';

export default function DashNavigator() {
    const DashScreen = createDrawerNavigator();
    // const DashScreen = createStackNavigator();
    // const DashScreen = createMaterialTopTabNavigator();
    // const DashScreen = createBottomTabNavigator();
    // const DashScreen = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <DashScreen.Navigator screenOptions={{
                headerShown: false,                
                gestureEnabled: true,
                gestureDirection: "horizontal",
                ...TransitionPresets.SlideFromRightIOS,
            }}>
                <DashScreen.Screen name="Dashboard" component={Dash} options={{
                     title: 'Dashboard',
                     tabBarIcon: () => (<AntDesignIcons name={'dashboard'} size={25} color='blue' />),
                     }} />
                <DashScreen.Screen name="MisDatos" component={MisDatos} options={{ 
                    title: 'Mis Datos',
                    tabBarIcon: () => (<AntDesignIcons name='user' size={25} color='red' />)
                    }} />
                <DashScreen.Screen name='Contactos' component={Contacts} />
            </DashScreen.Navigator>

        </NavigationContainer>
    )
}
