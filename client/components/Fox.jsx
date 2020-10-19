import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-native';

function Fox({auth}){
    //history.push("/register-confirmation");
    let location = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
        if(location === '/login'){
            if(auth.token){
                controller(auth, history);
            }
        }

        if(location === '/register'){
            if(auth.user.id){
                controller(auth, history);
            }
        }

        if(location === '/email-verifier'){
            if(auth.token){
                controller(auth, history);
            }
        }


    },[auth, location, history]);


    return null;
}

function controller(auth, history) {
    console.log(auth);
    if(!auth.user.emailVerifiedAt){
        return history.push('/email-verifier');
    }
    if(!auth.user.dataCompletedAt){ //no se dio de alta
        return history.push('/register-confirmation')
    }
    return history.push('/dash');
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    {}
)(Fox);