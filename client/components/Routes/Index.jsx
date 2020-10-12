import React from 'react';
import { connect } from 'react-redux';
// Navigator
import { NavigationContainer } from '@react-navigation/native';
import {
    AuthStackScreen,
    EmailVerifierStackScreen,
    RegisterStackScreen,
    UserDrawerScreen,
} from './Routes';


const IndexRoutes = ({ user, token }) => {
    if (token) {
        if (!user.emailVerifiedAt){
           return <NavigationContainer><EmailVerifierStackScreen /></NavigationContainer>
        } 
        if (!user.dataCompletedAt){
            return <NavigationContainer><RegisterStackScreen /></NavigationContainer>
        } 
        return <NavigationContainer><UserDrawerScreen /></NavigationContainer>
    }
    return <NavigationContainer><AuthStackScreen /></NavigationContainer>
   
}





const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(IndexRoutes)