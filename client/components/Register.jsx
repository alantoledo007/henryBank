//general
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-native";
import axios from 'axios';
import env from "../env";

//redux
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";

//UI
import {Button, Input, bn, QTLink, Container, Logo, Alert, Label} from './Quantum';
import colors from './style/colors';
import s from './style/styleSheet';
import Toast from 'react-native-toast-message';

import rules from '../rules';

function Register({ register, navigation}) {
    const { control, handleSubmit, errors} = useForm();
    const [hidePassword, setHidePassword] = useState(true);

    const [ dis, setDis ] = useState(false);

    //Muestra error por 5 segundos, igual que en login
    const [error, setError] = useState("");
    const showError = err => {
        setError(err);
        setTimeout(() => {
            setError("");
        }, 5000);
    };

    const onSubmit = data => {
        setDis(!dis);
        axios.post(env.API_URI + "/auth/register", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                const { data } = res;
                //Envío de data al store
                register(data.data);
                setDis(!dis);
            })
            .catch(async err => {
                //Manejo de errores:
                setDis(false);
                console.log(err);
                Toast.show({
                    type:'error',
                    text1:'¡Ups!',
                    text2: error.response ? error.response.error.message : err
                })
                return showError("¡El correo ingresado ya está en uso!");
            });
    };

    return (
        
        <Container>
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.password?.type === 'required' && <Label type="error" text="Se requiere una contraseña" />}
                </View>
                <View style={bn('col-12 mt-5')}>
                    {error ? <Text style={{ ...s.textWhite, fontWeight: "bold", ...s.size(3), ...s.mb(1) }}>{error}</Text> : null}
                    <Button label="CREAR CUENTA" style={bn('mb-5')} color="primary" 
                        disabled={dis} onPress={handleSubmit(onSubmit)}></Button>

                    <QTLink to="Login" {...{navigation}} label="¿Ya estás registrado? Iniciá sesión" />
                </View>
            </View>
        </Container>
    );
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => dispatch(register(data))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);