//general
import React, { useState } from 'react';
import { ScrollView, View, Image, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import env from "../env";

//redux
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";

//UI
import s from './style/styleSheet';

function Register({ register }) {
    const history = useHistory();
    const { control, handleSubmit } = useForm();
    const [hidePassword, setHidePassword] = useState(true);

    //Muestra error por 5 segundos, igual que en login
    const [error, setError] = useState("");
    const mostrarError = (err) => {
        setError(err);
        setTimeout(() => {
            setError("");
        }, 5000);
    };

    const onSubmit = data => {
        axios.post(env.API_URI + "/auth/register", JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                const { data } = res.data;
                //Envío de data al store
                register(data);
                return data;
            })
            .then((data) => {
                //Redireccionamos a la pantalla de confirmar registro
                history.push("/register-confirmation");
            })
            .catch(err => {
                //Manejo de errores:
                console.log("hola" + err)
            });
    };

    return (
        <ScrollView style={s.container}>
            <View>
                <Image source={require("../Logo.png")} style={{ width: 160, height: 160, alignSelf: "center" }}></Image>
                <Text style={{ ...s.textWhite, ...s.size(4), ...s.textCenter }}>Creá una cuenta y administrá tu plata como quieras, cuando quieras</Text>
            </View>
            <View style={{ width: "100%" }}>
                <View style={s.mt(5)}>
                    <Text style={{ ...s.textWhite, ...s.size(4), ...s.mb(1) }}>
                        Correo electrónico
                    </Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={{ ...s.input, ...s.textColor('rgb(75,75,75)'), fontWeight: "normal", ...s.size(3.5) }}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                autoCapitalize="none"
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
                                    style={{ ...s.input, ...s.textColor('black'), width: "90%", borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    secureTextEntry={hidePassword}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    autoCapitalize="none"
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
                    <TouchableOpacity
                        style={{ ...s.btn(), ...s.mt(7) }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={{ ...s.textWhite, ...s.size(5) }}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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