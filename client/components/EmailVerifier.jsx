// este es el verificado de correo electrónico.

//General
import { ScrollView, StyleSheet, StatusBar, View, TouchableOpacity, Text, TextInput } from 'react-native';
import React,{ useState, useEffect} from 'react';
import {Link} from 'react-router-native';

//Redux
import {connect} from 'react-redux';

//UI
import s from './style/styleSheet';


function EmailVerifier({email}){

    const [state,setState] = useState({
        needCode: false,
        email: null
    });

    const switchNeedCode = () => {
        setState({
            ...state,
            needCode: !state.needCode
        })
    }

    useState(() => {
        if(!email) return;
        console.log(email)
        setState(state => {
            return {
                ...state,
                email:email
            }
        })
    },[email]);

    return (
        <ScrollView style={s.container}>
            <View style={{ ...s.mb(5)}}>
                <Link to="/" component={TouchableOpacity}>
                    <Text style={s.textColor('orange')}> &lt; Volver al inicio</Text>
                </Link>
            </View>
            <Text style={{ ...s.textWhite, fontSize:20, textAlign:'center', ...s.mb(5) }}>
                Verificación de correo electrónico
            </Text>

            {state.needCode && (
                <Text style={{ ...s.mb(4),...s.textWhite }}>
                    Te enviaremos un nuevo código.
                    <Link onPress={switchNeedCode} style={s.textColor('orange')} component={Text}>
                        {" "}¿Ya tienes un código?
                    </Link>
                </Text>
            )}

            {!state.needCode && (
                <Text style={{ ...s.mb(4),...s.textWhite }}>
                    Te enviamos un correo electrónico con
                    <Text style={{ fontWeight:'bold' }}> un código de verificación</Text>.
                    <Link onPress={switchNeedCode} style={s.textColor('orange')} component={Text}>
                        {" "}¿Aún no te llegó el código?
                    </Link>
                </Text>
            )}

            {(state.email === null || state.needCode) && (
                <View style={s.mb(4)}>
                    <TextInput
                    style={{ ...s.input }}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    defaultValue={state.email}
                    //No estoy seguro si estos dos siguientes son necesarios así que por las dudas los dejo comentados
                    //textContentType="emailAddress"
                    autoCompleteType="email"
                    />
                </View>
            )}           

            {!state.needCode && (
                <View style={s.mb(4)}>
                    <TextInput
                    style={{ ...s.input }}
                    placeholder="Ingrese el código"
                    keyboardType='numeric'
                    //No estoy seguro si estos dos siguientes son necesarios así que por las dudas los dejo comentados
                    // textContentType="emailAddress"
                    // autoCompleteType="email"
                    />
                </View>
            )}

            <View>
                <Link component={TouchableOpacity} style={s.btn()}>
                    {!state.needCode && <Text style={{ fontWeight:'bold',...s.textColor('white') }}>VERIFICAR</Text>}
                    {state.needCode && <Text style={{ fontWeight:'bold',...s.textColor('white') }}>ENVIAR CODIGO</Text>}
                </Link>
            </View>
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return {
        email: state.auth.user.email,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailVerifier);