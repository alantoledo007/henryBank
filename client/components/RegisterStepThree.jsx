//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';


function RegisterStepThree(){

    const [direccion, setDireccion] = useState("");
    const [barrio, setBarrio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");

    console.log(direccion, barrio, ciudad, pais)

    return (
        <View style={styles.container}>

            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB',
                paddingVertical: 15}}>
                Completa tus datos
            </Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.95}
                style={styles.barra}
            />
        
            <View style={styles.form}>

                <Text style={styles.text}>Dirección</Text>

                <TextInput
                   placeholder='Dirección'
                   style={styles.input}
                   onChangeText={(text) => setDireccion(text)}

                />

                <Text style={styles.text}>Barrio</Text>

                <TextInput
                   placeholder='Barrio'
                   style={styles.input}
                   onChangeText={(text) => setBarrio(text)}

                />

                <Text style={styles.text}>Ciudad</Text>

                <TextInput
                   placeholder='Ciudad'
                   style={styles.input}
                   onChangeText={(text) => setCiudad(text)}

                />

                <Text style={styles.text}>País</Text>

                <TextInput
                   placeholder='País'
                   style={styles.input}
                   onChangeText={(text) => setPais(text)}

                />
            </View>

            <View style={styles.buttonsContainer}>
                    <TouchableOpacity >
                        <Link to="/register-step-two" style={styles.button}>
                            <Text style={styles.buttonText}>Atras</Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Link to="/" style={styles.button}>
                            <Text style={styles.buttonText}>Completar registro</Text>
                        </Link>
                    </TouchableOpacity>           
            </View>  
            <Text style={{  color:'#FFBD69', padding: 20 }}>Quantum</Text>                 
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
      },
      button: {
            backgroundColor: '#E94560',
            borderRadius: 7,
            width: 150,
      },
      buttonText: {
            textAlign: 'center',
            padding: 10,
            color: 'white',
      },
      buttonsContainer: {
            padding: 10,          
            width: '100%',
            alignItems: 'center',       
            flexDirection: 'row',
            justifyContent: 'space-around' 
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
           padding:10

      },
      barra: {
            color: '#FFBD69',
            width: 180,
      },
      text: { 
        fontSize:20, 
        color:'#EBEBEB', 
        padding:10
      },
      documento: { 
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderRadius: 8,
    },
});

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(RegisterStepThree);