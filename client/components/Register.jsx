//general
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import env from "../env";

//redux
import { connect } from "react-redux";
import { register as userRegister } from "../redux/actions/auth";

//UI
import {Button, Input, bn, QTLink, Container, Logo, Alert, Label, toastConfig} from './Quantum';
import colors from './style/colors';
import Toast from 'react-native-toast-message';

import rules from '../rules';

function Register({ userRegister, navigation}) {
    const { control, handleSubmit, errors} = useForm();
    const [hidePassword, setHidePassword] = useState(true);

    const [ dis, setDis ] = useState(false);

    const onSubmit = data => {
        // console.log(data);
        setDis(true)
        userRegister(data)
        .then(()=>{
            navigation.navigate("EmailVerifier")
        })
        .catch(err => {
            //Manejo de errores:
            setDis(false);
            if(err.response?.data?.code === 422){
                if(err.response.data.type === 'EMAIL_DUPLICATED'){
                    return Toast.show({
                        type: "error",
                        text1: "Ya está registrado",
                        text2: "El correo electrónico ya está registrado, intenete ingresar, si no recuerda su clave la puede recuperar."
                    });
                }
                return Toast.show({
                    type: "error",
                    text1: "Datos incorrectos",
                    text2: "Uno o más campos no contienen información valida. Por favor verifique e intente nuevamente."
                });
            }
            if(err.response?.data?.code === 500){
                return Toast.show({
                    type: "error",
                    text1: "Error interno",
                    text2: "Ocurrió un error interno y nuestro equipo ya está trabajando para solucionarlo."
                })
            }
      
            return Toast.show({
                type: "error",
                text1: "Error de conexión",
                text2: "Por favor, verifique su conexión a internet e intente nuevamente, si el problema persiste ponganse en contacto con el equipo técnico"
            });
        });
    };
    //const onSubmit = data => console.log(data);

    return (
        
        <Container>
            <View style={bn('row')}>
                <View style={bn('col-12')}>
                    <Logo />
                    <Alert content="Su primer paso en Quantum, crearse una cuenta" />
                </View>
            </View>

            
            <ActivityIndicator animating={dis} size="large" color={colors.pink} />
            <View style={bn('row')}>
                <View style={bn('col-12')}>
                    <Label text="Correo electrónico" />
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                placeholder="ejemplo@mail.com"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!dis} 
                            />
                        )}
                        name="email"
                        rules={{ required: true, pattern:rules.email }}
                        defaultValue=""
                    />
                    {errors.email?.type === 'required' && <Label type="error" text="Se requiere un email" />}
                    {errors.email?.type === 'pattern' && <Label type="error" text="El email no es válido" />}
                </View>
                <View style={bn('col-12')}>
                    <Label style={bn('mt-2')} text="Contraseña" />
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                secureTextEntry={hidePassword}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="••••••••"
                                autoCapitalize="none"
                                editable={!dis}
                                iconRight={hidePassword ? require("../assets/eye.png") : require("../assets/eye-slash.png")}
                                onIconRightPress={() => setHidePassword(!hidePassword)}
                            />
                        )}
                        name="password"
                        rules={{
                            required: "Ingrese una contraseña",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener mínimo 8 caracteres"
                            }
                        }}
                        defaultValue=""
                    />
                    {errors.password && <Label type="error" text={errors.password.message} />}
                </View>
                <View style={bn('col-12 mt-5')}>

                    <Button label="CREAR CUENTA" style={bn('mb-5')} color="primary" 
                        disabled={dis} onPress={handleSubmit(onSubmit)}></Button>

                    <QTLink to="Login" {...{navigation}} label="¿Ya estás registrado? Iniciá sesión" />
                </View>
            </View>
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        userRegister: data => dispatch(userRegister(data))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);