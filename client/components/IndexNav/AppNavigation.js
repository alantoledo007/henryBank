import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';

// import 'react-native-gesture-handler';
//navigators:
import { Auth, EmailVerify, CompleteUserData } from './Routes';
import Dash from '../DashboardNav/Index';

//Este componente va a renderizar un Navigator para cada sección, dependiendo del state de redux
function AppNavigation({ user,token }) {
    const [component,setComponent] = useState(null);
    useEffect(() => {
        let mounted = true;
        // console.log(user);
        //Si no hay token, mandamos al stack de Auth
        if(!mounted) return;
        if (!token) {
            setComponent(<Auth />)
        }else if (!user.emailVerifiedAt) {
            setComponent(<EmailVerify />)
        }else if (!user.dataCompletedAt) {
            setComponent(<CompleteUserData />)
        }else{
            setComponent(<Dash />)
        }
        return () => {
            mounted = false;
        };
        //Si no falta ningún dato, entonces todo OK y mandamos al usuario al stack del Dashboard
    },[user, token]);

    return component;
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AppNavigation);