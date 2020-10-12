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

const IndexRoutes = ({ user, token }) => (
    <NavigationContainer>
        { user.email === null ? <AuthStackScreen />
            : !user.emailVerifiedAt ? <EmailVerifierStackScreen />
                : !user.dataCompletedAt ? <RegisterStackScreen />
                    : <UserDrawerScreen />}
    </NavigationContainer>
)

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(IndexRoutes)