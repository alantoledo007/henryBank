import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import Dash from './Dash';
import MisDatos from './MisDatos';
import { TransitionPresets } from '@react-navigation/stack';


export function Contacts() {
    const ContactScreen = createMaterialTopTabNavigator();
    return (
        <ContactScreen.Navigator screenOptions={{
            headerShown: false,                
            gestureEnabled: true,
            gestureDirection: "horizontal",
            ...TransitionPresets.SlideFromRightIOS,
        }}>
            <ContactScreen.Screen name="Dashboard" component={Dash} options={{
                 title: 'Dashboard',
                 tabBarIcon: () => (<AntDesignIcons name={'dashboard'} size={25} color='blue' />),
                 }} />
            <ContactScreen.Screen name="MisDatos" component={MisDatos} options={{ 
                title: 'Mis Datos',
                tabBarIcon: () => (<AntDesignIcons name='user' size={25} color='red' />)
                }} />
        </ContactScreen.Navigator>
    )
}
