import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import colors from "../style/colors";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { Poppins_900Black } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import env from '../../env';

//Redux
import { connect } from "react-redux";
import { passwordReset } from "../../redux/actions/PasswordReset";

//UI
import {Container, Logo, QTLink, Button, Input, bn, Alert, Label, toastConfig} from '../Quantum';
import s from '../style/styleSheet';
import Toast from 'react-native-toast-message';

function Index({ email, passwordReset, navigation }) {
    
    /* Dis se utiliza para desabilitar el boton y el input y tambien habilitar el spinner */
    const [ dis, setDis ] = useState(false);
    const history = useHistory();
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        setDis(true)
        /* Seteo en redux el email para la renovacion de la constraseña */
        passwordReset(data.email)
        /* Se solicita a la api que envie un mail con un codigo */
        axios.post(env.API_URI + '/auth/send_restore_code', JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then( response => {
                setDis(false)
                console.log('reset')
                navigation.navigate("Reset");
            })
            .catch((err) => { 
                console.log(err)   
                setDis(false)
                Toast.show({
                    type: "error",
                    text1: "Hubo un error",
                    text2: "Inténtelo de nuevo"
                })
            });
    };
    
    return (
        <Container>
            <Logo />

            <View>
                <Alert content="Recuperar Contraseña" />
            <Label style={{textAlign: "center"}} text='Se le enviará un correo electronico con un código que debera utilizar a continuación' />
            </View>

            <View style={s.mb(4)}>
            <ActivityIndicator animating={dis} size="large" color={colors.pink} />
            <Label text="Correo electrónico" />
                    <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Ingrese Email"
                            placeholder="ejemplo@mail.com"    
                            keyboardType="email-address"
                            //autoFocus={true}
                            editable={!dis}
                            autoCapitalize="none"
                        />
                    )}
                    name="email"
                    rules={{                             
                        required: "Debe ingresar un email",
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Debe ingresar un email válido'
                        } 
                    }}
                    defaultValue=""
                />

            {errors.email && <Label type='error' text={errors.email.message} /> }
            </View>
            <Button label='Enviar Codigo' onPress={ handleSubmit(onSubmit) } />                
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: StatusBar.currentHeight * 2,
        backgroundColor: colors.orange,
    },
    headerText: {
        fontSize: 30,
    },
    content: {
        flex: 5,
        paddingTop: 60,
        backgroundColor: "rgb(34,31,59)",
        width: '100%'
    },
    titleWrapper: {
        // flex: 0.7,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 10,
        width: '90%',
    },
    title: {
        alignSelf: "center",
        color: colors.white,
        fontSize: 35,
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
    },
    subTitle: {
        color: 'gray',
        alignSelf: 'center',
        fontSize: 20,
        paddingTop: 10,
        textAlign: 'center',

    },
    inputWrapper: {
        // flex: 1.7,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    inputs: {
        // flex: 0.5,
        justifyContent: "space-around",
    },
    input: {
        fontFamily: "Poppins_400Regular_Italic",
        color: "#221F3B",
        backgroundColor: colors.white,
        margin: 10,
        height: 50,
        width: 250,
        borderBottomColor: colors.pink,
        borderBottomWidth: 5,
        borderRadius: 5,
        fontSize: 20,
        paddingLeft: 8,
        paddingBottom: 5,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.pink,
        alignSelf: "center",
        width: 250,
        height: 60,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        padding: 20,
        color: colors.white,
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
    },
    backButton: {
        backgroundColor: colors.pink,
        height: 40,
        width: 80,
        borderRadius: 7,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    backButtonText: {
        color: colors.white,
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
    },
    error: {
        color: colors.white,
        fontSize: 30,

    }
});

const mapStateToProps = (state) => {
    return {
      email: state.PasswordReset.email,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        passwordReset: (data) => dispatch(passwordReset(data)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Index);