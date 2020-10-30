import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { TabBar, TabView, Tab, Modal, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';

import { bn, Container, hbn, Label, QTLink, toastConfig } from '../../Quantum';

import currency from '../../currency';

import { connect } from 'react-redux';

const PesosTab = ({accounts, navigation}) => {

    const [state,setState] = useState({
        balance: 0
    })

    useEffect(()=>{
        // console.log(accounts)
        if(!accounts) return;
        setState(state => {
            return {
                ...state,
                balance: accounts.find(acc => acc.currency === 'ars').balance
            }
        })
    },[accounts])

    return (<Layout style={{flex:1,...bn('py-6 px-6')}}>
        <KText category='h2' style={bn('mb-4 text-center')}>{currency(state.balance)}</KText>
        <View style={bn('row')}>
            <View style={bn('col-6 pr-2')}>
                <Button size="small" onPress={() => navigation.navigate('Transferencia')}>
                    TRANSFERIR
                </Button>
            </View>
            <View style={bn('col-6 pl-2')}>
                <Button size="small" appearance="outline" onPress={() => navigation.navigate('Transferencias')}>
                    MOVIMIENTOS
                </Button>
            </View>
        </View>
    </Layout>);
};

function mapStateToProps(state) {
    return {
        accounts: state.auth.user.accounts
    }
}

export default connect(mapStateToProps, null)(PesosTab);
