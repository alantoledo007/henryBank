//general
import React,  { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, 
    TextInput, Picker, ProgressBarAndroid} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';
import { stepTwo } from '../redux/actions/register';
import colors from "./style/colors";
import s from "./style/styleSheet";


function RegisterStepTwo(props){

    const { stepTwo } =props;

    const history = useHistory()

    const [selectedValue, setSelectedValue] = useState("dni");
    const [telefono, onChangeTelofono] = useState(null);
    const [num_doc, onChangeNum_doc] = useState(null);

    function next () {
        if(selectedValue === null || telefono === null || num_doc === null ){
            return mostrarError('Debe ingresar todos los datos')}
        if(num_doc.length > 10 || num_doc.length < 8 ){
            return mostrarError('No es número documento valido')}
        if(telefono.length >= 20 || telefono.length < 7 ){
            return mostrarError('No es un teléfono valido')}
        const payload = {
            doc_type: selectedValue,
            doc_number: parseInt(num_doc),
            phone_number: parseInt(telefono)
        }

        stepTwo(payload)
        history.push( '/register-step-three' )
    }

    const [error, setError] = useState("");
    const mostrarError = (err) => {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    };

    return (
        <View style={styles.container}>

            <Text style={{ fontSize:20, justifyContent:'center', color:'#EBEBEB',
                paddingVertical: 8}}>
                Completá tus datos
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
                   placeholder='Teléfono'
                   style={s.input}
                   keyboardType='numeric'
                   onChangeText={(text) => onChangeTelofono(text)}
                   


                />

                <Text style={styles.text}>Tipo de documento</Text>
                
                <View style={{...s.input, justifyContent:"center"}}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        
                    >
                        <Picker.Item label="DNI" value="dni" />
                        <Picker.Item label="passport" value="passport" />
                    </Picker>
                </View>
                
                <Text style={styles.text}>Número documento</Text>

                <TextInput
                   placeholder='Documento'
                   style={s.input}
                   keyboardType='numeric'
                   onChangeText={text => onChangeNum_doc(text)}
                   
                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Link to="/register-confirmation" >
                            <Text style={{ ...s.textWhite, ...s.size(4) }}>Atrás</Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => next()}>
                            <Text style={{ ...s.textWhite, ...s.size(4) }}>Siguiente</Text>                 
                    </TouchableOpacity>    
                </View>
                
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            
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
            marginTop: 22,
            padding: 20,
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
            paddingVertical:10
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