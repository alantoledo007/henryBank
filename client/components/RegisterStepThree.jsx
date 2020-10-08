//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid, Modal,TouchableHighlight,} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';
import { resetRegister } from '../redux/actions/register';
import  axios  from 'axios';
import env from '../env';
import colors from "./style/colors";
import s from "./style/styleSheet"

function RegisterStepThree(props){
    const history = useHistory()

    const [modalVisible, setModalVisible] = useState(false);

    const { fullState, resetRegister, token } =props;

    const [direccion, setDireccion] = useState(null);
    const [altura, setAltura] = useState(null);
    const [barrio, setBarrio] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [pais, setPais] = useState(null);

    const [error, setError] = useState("");
    const mostrarError = (err) => {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    };
    
    function next () {
        if(direccion === null || altura === null || barrio === null ||
            ciudad === null || pais === null ){
            return mostrarError('Debe ingresar todos los datos')}
        if(direccion.length < 4 ){
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
        }
        console.log(payload)
        axios.put(`${env.API_URI}/auth/register_confirmation`, 
            payload,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data)
            setModalVisible(true)
            resetRegister();

        })
        .catch((error) => {
            console.log(error)
            mostrarError('Dirección no es valida')
        })     
    }
    
    return (
        <View style={styles.container}>

            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB',
                paddingVertical: 15}}>
                Completá tus datos
            </Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.95}
                style={styles.barra}
            />
        
            <View style={styles.form}>

                <Text style={styles.text}>Dirección</Text>

                <View style={{flexDirection: 'row'}}>

                    <TextInput
                    placeholder='Calle'
                    style={styles.input1}
                    onChangeText={(text) => setDireccion(text)}

                    />
                    <TextInput
                    placeholder='Altura'
                    style={styles.input2}
                    onChangeText={(text) => setAltura(parseInt(text))}
                    keyboardType='numeric'

                    />

                </View>

                <Text style={styles.text}>Localidad</Text>

                <TextInput
                   placeholder='Localidad'
                   style={s.input}
                   onChangeText={(text) => setBarrio(text)}

                />

                <Text style={styles.text}>Provincia</Text>

                <TextInput
                   placeholder='Provincia'
                   style={s.input}
                   onChangeText={(text) => setCiudad(text)}

                />

                <Text style={styles.text}>País</Text>

                <TextInput
                   placeholder='País'
                   style={s.input}
                   onChangeText={(text) => setPais(text)}

                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Link to="/register-step-two" >
                            <Text style={{ ...s.textWhite, ...s.size(4) }}>Atrás</Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => next()}>
                            <Text style={{ ...s.textWhite, ...s.size(4) }}>Completar</Text>
                    </TouchableOpacity>           
                </View>  
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            
            <Text style={{  color:'#FFBD69', padding: 20 }}>Quantum</Text>   

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
            }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <Text style={{...styles.modalText, color:'#221F3B', fontSize: 50}}>Bienvenido</Text>
                        <View style = {{
                            borderWidth: 1,
                            borderColor:'#221F3B',
                            width: 220,
                            margin: 10
                        }} />
                        <Text style={{...styles.modalText, color:'#FFBD69'}}>Registro completo.</Text>
            
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#E94560" }}
                            onPress={() => {
                            setModalVisible(!modalVisible);
                            history.push('/dash')
                            }}
                        >
                            <Text style={styles.textStyle}>Continuar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>    
              
        </View>
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
        paddingVertical:10
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(RegisterStepThree);