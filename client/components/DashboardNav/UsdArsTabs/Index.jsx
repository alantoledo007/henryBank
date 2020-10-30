import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TabBar, TabView, Tab, Modal, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Toast from 'react-native-toast-message';

import { connect } from 'react-redux';

//Sub-components
import PesosTab from './PesosTab';
import DollarsTab from './DollarsTab';

import { bn, Container, hbn, Label, QTLink, toastConfig } from '../../Quantum';

//Stack de navegación
const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
    <Layout style={bn('px-6')}>
        <TabView
            indicatorStyle={bn('bg-primary')}
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <Tab style={bn('px-4')} title="ARS"/>
            <Tab style={bn('px-4')} title='USD'/>
        </TabView>
    </Layout>
  );

const UsdArsDash = ({navigation}) => {
    // const showToastInDash = obj => {
    //     return Toast.show(obj)
    // }

    return (
    <Navigator tabBar={props => <TopTabBar {...props} indicatorStyle={bn('text-red')} />}>
        <Screen name='Pesos' component={PesosTab}/>
        <Screen name='Dollars' component={DollarsTab}/>
    </Navigator>
    )
}

export default UsdArsDash;
