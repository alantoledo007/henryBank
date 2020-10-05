//general
import React, { useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, 
        TextInput, ProgressBarAndroid, Button} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';



function RegisterConfirmation(){

    const dispatch = useDispatch()

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    };

    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };
    
    const [name, onChangeName] = useState('');
    const [surname, onChangeSurname] = useState('');


    return (
        
        <View style={styles.container}>
       

            <Text style={{ fontSize:30, color:'#EBEBEB',
                paddingVertical: 30, justifyContent:'center', textAlign:'center' }}>
                    Gracias por verificar tu correo 
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
                   value={name}
                   onChangeText={(text) => onChangeName(text)}
                   


                />

                <Text style={styles.text}>Apellido</Text>

                <TextInput
                   placeholder='Apellido'
                   style={styles.input}
                   onChangeText={(text) => onChangeSurname(text)}

                />

                <Text style={styles.text}>Fecha nacimiento</Text>

        <View>
            <View style={styles.input}>
                <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.date}>{date.toDateString()}</Text>                 
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            </View>    

            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity >
                    <Link to="/register-step-two" style={styles.button} >
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </Link>
                </TouchableOpacity>
            </View>
            
            <Text style={{  color:'#FFBD69', padding: 20 }}>Quantum</Text>
            

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
            alignContent:'center',
            justifyContent: 'center',
            width: '90%',
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
      date: {
          textAlign:'center',
          color: 'gray',
      }
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