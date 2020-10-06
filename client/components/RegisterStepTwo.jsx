//general
import React,  { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';
import { stepTwo } from '../redux/actions/register';

function RegisterStepTwo(props){

    const { stepTwo } =props;

    const history = useHistory()

    const [selectedValue, setSelectedValue] = useState("DNI");
    const [telefono, onChangeTelofono] = useState('');
    const [num_doc, onChangeNum_doc] = useState('');

    function next () {
        const payload = {
            doc_type: selectedValue,
            doc_number: num_doc,
            phone_number: telefono
        }

        stepTwo(payload)
        history.push( '/register-step-three' )
    }

    return (
        <View style={styles.container}>

            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB',
                paddingVertical: 8}}>
                Completa tus datos
            </Text>

            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.6}
                style={styles.barra}
            />
        

            <View style={styles.form}>

                <Text style={styles.text}>Número teléfono</Text>
                
                <TextInput
                   placeholder='Telefono'
                   style={styles.input}
                   keyboardType='numeric'
                   onChangeText={(text) => onChangeTelofono(text)}
                   


                />

                <Text style={styles.text}>Tipo de documento</Text>
                
                <View style={styles.documento}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        
                    >
                        <Picker.Item label="DNI" value="DNI" />
                        <Picker.Item label="Pasaporte" value="Pasaporte" />
                    </Picker>
                </View>
                
                <Text style={styles.text}>Numero documento</Text>

                <TextInput
                   placeholder='Documento'
                   style={styles.input}
                   keyboardType='numeric'
                   onChangeText={text => onChangeNum_doc(text)}
                   
                />
                
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity >
                    <Link to="/register-confirmation" style={styles.button}>
                        <Text style={styles.buttonText}>Atras</Text>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => next()}>
                        <Text style={styles.buttonText}>Siguiente</Text>                 
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
            padding: 20,          
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
            paddingVertical: 30,
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
        stepTwo: payload => dispatch(stepTwo(payload)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)
(RegisterStepTwo);