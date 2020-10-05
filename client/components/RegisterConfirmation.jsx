//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, 
        TextInput, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

//actions
import {setName} from '../redux/actions/auth';

function RegisterConfirmation(){

    

    return (
        
        <View style={styles.container}>
       

            <Text style={{ fontSize:30, color:'#EBEBEB',
                paddingVertical: 30, justifyContent:'center', textAlign:'center' }}>Gracias por verificar tu correo 
            </Text>

            <View style = {{
                borderWidth: 0.5,
                borderColor:'#E94560',
                margin:10,
                width: '90%'
            }} />

            
            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB',
                paddingVertical: 8}}>
                Completa tus datos
            </Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.33}
                style={styles.barra}
            />
        

            <View style={styles.form}>

                <Text style={styles.text}>Nombre</Text>
                
                
                <TextInput
                   placeholder='Nombre'
                   style={styles.input}

                />

                <Text style={styles.text}>Apellido</Text>

                <TextInput
                   placeholder='Apellido'
                   style={styles.input}

                />

                <Text style={styles.text}>Fecha nacimiento</Text>

                <TextInput
                placeholder='Fecha nacimiento'
                style={styles.input}

                />

            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity >
                    <Link to="/register-step-two" style={styles.button}>
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </Link>
                </TouchableOpacity>
            </View>
            
            <Text style={{  color:'#FFBD69', padding: 20 }}>HenryBank</Text>
            

        </View>
      
    );
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
            width: 150
      },
      buttonText: {
            textAlign: 'center',
            padding: 10,
            color: 'white',
      },
      buttonsContainer: {
            paddingVertical:20,          
            width: '100%',
            alignItems: 'center',            
      },
      form: {
            flex: 1,
            alignContent:'center',
            justifyContent: 'center',
            width: '90%',
            height: 400,
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
            paddingVertical: 10,
      },
      text: { 
        fontSize:20, 
        color:'#EBEBEB', 
        padding:10
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

export default connect(mapStateToProps,mapDispatchToProps)
(RegisterConfirmation);