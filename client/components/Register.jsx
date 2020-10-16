//general
import React, { useState } from 'react';
import { ScrollView, View, Image, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-native";
import axios from 'axios';
import env from "../env";

//redux
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";

//UI
import { LinearGradient } from 'expo-linear-gradient';
import colors from './style/colors';
import s from './style/styleSheet';

function Register({ register }) {
    const { control, handleSubmit } = useForm();
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
            .catch(err => {
                //Manejo de errores:
                setDis(false);
                return showError("¡El correo ingresado ya está en uso!");
            });
    };

    return (
        
        <View style={{ ...s.container}}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
            <ScrollView style={{ position:'relative',left:0, right:0, margin:0,padding:0, display:'flex'}}>
            <View>
                <Image source={require("../logo.png")} style={{ width: 160, height: 160, alignSelf: "center" }}></Image>
                <Text style={{ ...s.textWhite, ...s.size(4), ...s.textCenter }}>Creá una cuenta y administrá tu plata como quieras, cuando quieras</Text>
            </View>
            <ActivityIndicator animating={dis} size="large" color={colors.pink} />
            <View style={{ width: "100%" }}>
                <View style={s.mt(5)}>
                    <Text style={{ ...s.textWhite, ...s.size(4), ...s.mb(1) }}>
                        Correo electrónico
                    </Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                placeholder="ejemplo@mail.com"
                                style={{ ...s.input, ...s.textColor('rgb(75,75,75)'), fontWeight: "normal", ...s.size(3.5) }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!dis} 
                            />
                        )}
                        name="email"
                        rules={{ required: true }}
                        defaultValue=""
                        
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{ ...s.textWhite, ...s.size(4), ...s.mt(2), ...s.mb(1), flexDirection: "row" }}>
                        Contraseña
                    </Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <View style={{ flexDirection: "row" }}>
                                <TextInput
                                    style={{ ...s.input, ...s.textColor('rgb(75,75,75)'), fontWeight: "normal", ...s.size(3.5), width: "90%", borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    secureTextEntry={hidePassword}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    placeholder="••••••••"
                                    autoCapitalize="none"
                                    editable={!dis} 
                                />
                                <View style={{ alignItems: "flex-end", width: "10%", height: 50, ...s.input, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                    <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                                        <Image
                                            style={{ marginVertical: -2, width: 25, height: 25 }}
                                            source={
                                                hidePassword
                                                    ? require("../assets/eye.png")
                                                    : require("../assets/eye-slash.png")
                                            }
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        )}
                        name="password"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                </View>
                <View style={s.mt(5)}>
                    {error ? <Text style={{ ...s.textWhite, fontWeight: "bold", ...s.size(3), ...s.mb(1) }}>{error}</Text> : null}
                    <TouchableOpacity
                        disabled={dis}
                        style={{ ...s.btn(), ...s.mb(10) }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={{ ...s.textWhite, fontWeight:'bold' }}>CREAR CUENTA</Text>
                    </TouchableOpacity>
                    <Link to="/login" component={TouchableOpacity}>
                        <Text style={{ ...s.textCenter, ...s.textColor('orange'), ...s.size(3.5) }}>
                            ¿Ya estás registrado? Iniciá sesión
                        </Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
        </View>
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