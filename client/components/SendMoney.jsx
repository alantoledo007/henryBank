//general
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TextInput, Button,  ScrollView, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import CheckBox from '@react-native-community/checkbox';

//redux
import { connect } from "react-redux";

//UI
import s from './style/styleSheet';

const SendMoney = () => {

    const history = useHistory()

    const [selectedValue, setSelectedValue] = useState('Contactos');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [money, setMoney] = useState(0);
    const [description, setDescription] = useState('');

    const format = amount => {
    return Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&.');
    };

    const [error, setError] = useState("");
    const mostrarError = (err) => {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    };

    function next () {
        if(selectedValue === 'Contactos'){
            return mostrarError('Debe ingresar un contacto')}
        if(toggleCheckBox === false ){
            return mostrarError('Debe aceptar los terminos')}
        if(money === 0 ){
            return mostrarError('Debe ingresar el valor de la transferencia')}
        history.push('/')
    }


    //Prueba
    const balance = 20000;
    const amigos = ['nicolas', 'juan', 'daniel', 'diego'];



console.log('amigos:', selectedValue, 'money:', money, 'check:', toggleCheckBox, 'por ultimo el descripcion:', )

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
        <ScrollView style={{width:'100%'}}>
       
            <Text style={{...s.textWhite, ...s.textCenter, ...s.size(8), ...s.p(2)}}>
                Enviar dinero
            </Text>
            
            <Text style={{...s.textWhite, ...s.size(4), ...s.py(2)}}>Contacto</Text>

            <View style={{...s.input, justifyContent:"center"}}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label='Contactos' value='Contactos' />
                {amigos && amigos.map((x) =>  (
                     <Picker.Item label={x} value={x} key={x}/>

                ))}
                 </Picker>
            </View>

            <Text style={{...s.textWhite, ...s.textCenter, ...s.py(5)}}>Balance actual: ${balance}</Text>
                    
            <View style={{...s.my(4), justifyContent:'center', alignItems:'center', height:50}}>
                    <Text style={{...s.textWhite, ...s.size(7), ...s.textCenter}}>
                        $ {format(money)}
                    </Text>
                    <TextInput
                        style={{...s.size(7), borderColor:'rgba(0,0,0,0.0)',
                        color:'rgba(0,0,0,0.0)', width:'70%', height:50, textAlign:'center',
                        marginTop:-50}}
                        onChangeText={money => setMoney(money)}
                        keyboardType='numeric'/>
            </View>

            <Text style={{...s.textWhite, ...s.size(4), ...s.py(1)}}>¿Quieres decirle algo?</Text>
            <TextInput style={{...s.input, height:60}} multiline={true} 
                maxLength={150} onChangeText={text => setDescription(text)}
            />

            
            <View style={styles.checkboxContainer}>
                <View>
                    <View style={{backgroundColor:'white', width:15, height:15, position:'absolute', marginLeft:8.5,
                            borderRadius: 2, marginTop:8.5 }}></View>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}

                    />
                </View>
                <Text style={{...s.textWhite}}>Acepto términos y condiciones para realizar esta transferencia.</Text>
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <View>
                <TouchableOpacity style={{ ...s.btn()}} onPress={() => next()} >          
                    <Text style={{ ...s.textWhite, ...s.textButton() }}>Enviar</Text>            
                </TouchableOpacity>
            </View>

        </ScrollView>
    </View>
        
    )
}

const styles = StyleSheet.create ({
  checkboxContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 30
  },
  errorMessage: {
    color: '#E94560',
    alignSelf: "center",
    paddingVertical: 10,
  },
})

function mapDispatchToProps () {
    return {

    }
}

function mapStateToProps () {
    return {

    }
}

export default connect(mapDispatchToProps, mapStateToProps)(SendMoney);

