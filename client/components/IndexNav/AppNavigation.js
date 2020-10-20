import React from 'react'
import { connect } from 'react-redux';

// import 'react-native-gesture-handler';
//navigators:
import { Auth, EmailVerify, CompleteUserData } from './Routes';
import Dash from '../DashboardNav/Index';

//Este componente va a renderizar un Navigator para cada sección, dependiendo del state de redux
function AppNavigation({ auth }) {
    //Si no hay token, mandamos al stack de Auth
    if (!auth.token) {
        return <Auth />
    }
    //Si hay token pero no está verificado el mail, mandamos al stack de EmailVerify
    if (!auth.user.emailVerifiedAt) {
        return <EmailVerify />
    }
    //Si hay token y está verificado el mail, pero falta llenar los datos del usuario,
    //mandamos al stack de CompleteUserData
    if (!auth.user.dataCompletedAt) {
        return <CompleteUserData />
    }
    //Si no falta ningún dato, entonces todo OK y mandamos al usuario al stack del Dashboard
    return <Dash />
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AppNavigation);