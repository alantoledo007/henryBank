//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';
import { stepThree } from '../redux/actions/register';


function RegisterStepThree(props){
    const history = useHistory()

    const { stepThree } =props;

    const [direccion, setDireccion] = useState("");
    const [altura, setAltura] = useState("");
    const [barrio, setBarrio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");

    function next () {
        const payload = {
            address_street: direccion,
            address_number: altura,
            locality: barrio,
            province: ciudad,
            country: pais
        }

        stepThree(payload)
        history.push('/dash')
    }

    

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

                <View style={{flexDirection: 'row'}}>

                    <TextInput
                    placeholder='Calle'
                    style={styles.input1}
                    onChangeText={(text) => setDireccion(text)}

                    />
                    <TextInput
                    placeholder='Altura'
                    style={styles.input2}
                    onChangeText={(text) => setAltura(text)}
                    keyboardType='numeric'

                    />

                </View>

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
                    <TouchableOpacity style={styles.button} onPress={() => next()}>
                            <Text style={styles.buttonText}>Completar registro</Text>
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
           padding:10,

      },
      input2: {
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderBottomRightRadius: 8,
           borderTopRightRadius: 8,
           padding:10,
           width: '50%',
           margin: 0.4

      },
      input1: {
           height: 50, 
           borderBottomColor:'#E94560',
           borderBottomWidth: 5,
           backgroundColor: '#EBEBEB',
           borderBottomLeftRadius: 8,
           borderTopLeftRadius: 8,
           
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
        
        stepThree: payload => dispatch(stepThree(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(RegisterStepThree);

// const {
//     user,
//     name,
//     surname,
//     doc_type,
//     doc_number,
//     phone_number,
//     birthdate,
//     address_street,
//     address_number,
//     locality,
//     province,
//     country,
// } = props;


//  console.log( 'flag  | finish', name,
//     surname,
//     doc_type,
//     doc_number,
//     phone_number,
//     birthdate,
//     address_street,
//     address_number,
//     locality,
//     province,
//     country, )