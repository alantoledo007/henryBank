//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { loadAuth, resetRegister } from '../redux/actions/register';

import colors from "./style/colors";
import s from "./style/styleSheet";

import Toast from 'react-native-toast-message';

import { Input, Button, Container, Label, Logo, bn, toastConfig } from "./Quantum";

function RegisterStepThree(props){
    const { fullState, resetRegister, token, loadAuth, navigation } =props;

    const [direccion, setDireccion] = useState(null);
    const [altura, setAltura] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [pais, setPais] = useState('Argentina');

    const [error, setError] = useState("");
    const mostrarError = (err) => {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    };
    
    async function next () {
        if(direccion === null || altura === null || barrio === null ||
            ciudad === null || pais === null ){
            return mostrarError('Debe ingresar todos los datos')}
        if(direccion.length < 1 ){
            return mostrarError('No es una dirección valida')}
        
        const payload = {
            address_street: direccion,
            address_number: altura,
            locality: barrio,
            province: ciudad,
            country: pais,
            doc_type: fullState.doc_type,
            doc_number: fullState.doc_number,
            phone_number: fullState.phone_number,
            birthdate: fullState.birthdate,
            name: fullState.name, 
            surname: fullState.surname,
            dataCompletedAt: true
        }
        await loadAuth({data:payload, token})
        .then(async res => {
            await Toast.show({
                type:'success',
                text1:"¡Bienvenido!",
                text2:"El proceso de alta se completó correctamente."
            })
        })
        .catch((err) => {
            //Manejo de errores:
            if(err.response?.data?.code === 401){
                return Toast.show({
                  type: "error",
                  text1: "La sesión expiró",
                  text2: "Por favor, inicie sesión nuevamente."
                })
            }
            if(err.response?.data?.code === 410){
                return Toast.show({
                    type: "error",
                    text1: "Error inesperado",
                    text2: "Por favor, reinicie la aplicación."
                });
            }
            if(err.response?.data?.code === 422){
                return Toast.show({
                type: "error",
                text1: "Datos incorrectos",
                text2: "Uno o más campos no contienen información valida. Por favor verifique e intente nuevamente."
                })
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
        })     
    }
    
    return (
        <Container >
            <Logo />

            <Label text="Completá tus datos"/>

            <View style={s.bg('rgba(0,0,0, .2)')}>
                <View opacity={0.8} style={{ ...s.col(12),...s.hr('orange', 4) }} />
            </View>
        
            <View style={s.mt(5)}>

                <Label text="Dirección"/>

                <View style={{flexDirection: 'row', justifyContent:"space-between"}}>

                    <Input
                    placeholder='Calle'
                    style={s.col(6)}
                    onChangeText={(text) => setDireccion(text)}
                    />
                    
                    <Input
                    placeholder='Altura'
                    style={s.col(6)}
                    onChangeText={(text) => setAltura(parseInt(text))}
                    keyboardType='numeric'
                    />

                </View>

                <Label text="Localidad"/>

                <Input
                   placeholder='Localidad'
                   onChangeText={(text) => setBarrio(text)}
                />

                <Label text="Provincia"/>

                <Input
                   placeholder='Provincia'
                   onChangeText={(text) => setCiudad(text)}

                />

                <Label text="País"/>

                <Input
                   placeholder='Argentina'
                   editable={false}
                   onChangeText={(text) => setPais(text)}
                //    defaultValue="Argentina"

                />
                <Label text="Se requiere residir en Argentina."/>
                {/* <Text style={s.textWhite}>Se requiere residir en Argentina.</Text> */}

                <View style={{ ...s.row, justifyContent:'space-between', ...s.mt(4) }}>
                    <Button style={s.col(6,1)} onPress={()=>navigation.goBack()} label="Atrás"/>
                    <Button style={s.col(6,1)} onPress={()=>next()} label="Completar"/>
                </View>
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#221F3B',
            paddingTop: StatusBar.currentHeight,
            width: '100%',
            height: '100%',
            padding: 20,
            marginTop: 22
      },
      errorMessage: {
        color: colors.pink,
        alignSelf: "center",
        padding: 10,
      },
      button: {
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#E94560',
        alignItems: 'center',
        height: 50,
        width: '50%',
        justifyContent:'center',
        textAlignVertical: 'center',
        marginHorizontal: 1
        },
        buttonText: {
                textAlign: 'center',
                padding: 10,
                color: 'white',
        },
        buttonsContainer: {
                paddingVertical: 20,          
                width: '100%',      
                flexDirection: 'row',
        },
      form: {
            alignContent:'center',
            justifyContent: 'flex-start',
            width: '90%',
            paddingVertical: 30
      },
      input: {
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderRadius: 8,
           padding:10,

      },
      input2: {
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderBottomRightRadius: 5,
           borderTopRightRadius: 5,
           padding:10,
           width: '50%',
           margin: 0.4,
           fontWeight: 'bold'

      },
      input1: {
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderBottomLeftRadius: 5,
           borderTopLeftRadius: 5,
           fontWeight: 'bold',
           padding:10,
           width: '50%',
           margin: 0.4

      },
      barra: {
            color: '#FFBD69',
            width: 180,
      },
      text: { 
        fontSize:20, 
        color:'#EBEBEB', 
        paddingTop:10
      },
      centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
      documento: { 
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderRadius: 8,
    },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor:'#E94560'
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

function mapStateToProps(state) {
    return {
        fullState: state.register,
        token: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
        resetRegister: () => dispatch(resetRegister()),
        loadAuth: data => dispatch(loadAuth(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(RegisterStepThree);