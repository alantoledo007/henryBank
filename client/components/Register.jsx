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
import {Button, Input, bootnative, QTLink, Container} from './Quantum';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './style/colors';
import s from './style/styleSheet';

function Register({ register }) {
    const bn = bootnative();
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
        
        <Container>
                <View style={bn('row')}>
                    <View style={bn('col-12')}>
                        <Image source={require("../logo.png")} style={{ width: 64, height: 64, alignSelf: "center" }}></Image>
                        <Text style={{ ...bn('bg-#f1f1f1 p-2 borderRadius-10 text-center mt-4'),...s.size(4) }}>Creá una cuenta y administrá tu plata como quieras, cuando quieras</Text>
                    </View>
                </View>

                
                <ActivityIndicator animating={dis} size="large" color={colors.pink} />
                <View style={bn('row')}>
                    <View style={bn('col-12')}>
                        <Text style={{ ...s.size(4), ...s.mb(1) }}>
                            Correo electrónico
                        </Text>
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
                            rules={{ required: true }}
                            defaultValue=""
                            
                        />
                    </View>
                    <View style={bn('col-12')}>
                        <Text style={{ ...s.size(4), ...s.mt(2), ...s.mb(1) }}>
                            Contraseña
                        </Text>
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
                    </View>
                    <View style={bn('col-12 mt-5')}>
                        {error ? <Text style={{ ...s.textWhite, fontWeight: "bold", ...s.size(3), ...s.mb(1) }}>{error}</Text> : null}
                        <Button label="CREAR CUENTA" style={bn('mb-5')} color="primary" 
                            disabled={dis} onPress={handleSubmit(onSubmit)}></Button>

                        <QTLink to="/login" label="¿Ya estás registrado? Iniciá sesión" />
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