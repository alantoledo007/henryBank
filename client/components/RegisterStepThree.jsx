//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid, Modal,TouchableHighlight, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';
import { loadAuth, resetRegister } from '../redux/actions/register';
import  axios  from 'axios';
import env from '../env';
import colors from "./style/colors";
import s from "./style/styleSheet"
import { LinearGradient } from 'expo-linear-gradient';

function RegisterStepThree(props){
    const history = useHistory()

    const [modalVisible, setModalVisible] = useState(false);

    const { fullState, resetRegister, token, loadAuth } =props;

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
    
    function next () {
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
        }
        loadAuth(payload)
        axios.put(`${env.API_URI}/auth/register_confirmation`, 
            payload,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setModalVisible(true)
            // resetRegister();

        })
        .catch((error) => {
            console.log(error.response)
            mostrarError('Dirección no es valida')
        })     
    }
    
    return (
        <View style={s.container}>
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
            
            <ScrollView>
            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB', ...s.mb(2)}}>
                Completá tus datos
            </Text>

            <View style={s.bg('rgba(0,0,0, .2)')}>
                <View opacity={0.8} style={{ ...s.col(12),...s.hr('orange', 4) }} />
            </View>
        
            <View style={s.mt(5)}>

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
                   editable={false}
                   onChangeText={(text) => setPais(text)}
                   defaultValue="Argentina"

                />
                <Text style={s.textWhite}>Se requiere residir en Argentina.</Text>

                <View style={{ ...s.row, justifyContent:'space-between', ...s.mt(4) }}>
                    <View style={s.col(6,1)}>
                        <Link to="/register-step-two" component={TouchableOpacity} style={{ ...s.btn() }}>
                                <Text style={{ ...s.textButton() }}>Atrás</Text>
                        </Link>
                    </View>
                    <View style={s.col(6,1)}>
                        <TouchableOpacity style={s.btn()} onPress={() => next()}>
                                <Text style={{ ...s.textButton() }}>Completar</Text>
                        </TouchableOpacity>   
                    </View>
                </View>
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

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
            </ScrollView>
              
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