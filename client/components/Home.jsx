//general
import React from 'react';
import { StyleSheet,ScrollView, View, Text, Button, TouchableOpacity, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

//actions
import {setName} from '../redux/actions/auth';

//UI
import s from './style/styleSheet';

function Home({name,setName}){
    return (
        <ScrollView style={s.container}>

            <Text style={{ fontSize:40,flex:1 }}>HenryBank</Text>
            
            <View style={styles.buttonsContainer}>
                <View>
                    <TouchableOpacity onPress={setName}>
                        <Link to="/login" style={styles.button}>
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={setName}>
                        <Link to="/register" style={styles.button}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={setName}>
                        <Link to="/dash" style={styles.button}>
                            <Text style={styles.buttonText}>Tablero</Text>
                        </Link>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={setName}>
                        <Link to="/email-verifier" style={styles.button}>
                            <Text style={styles.buttonText}>EmailVerifier</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'green',
        paddingTop: StatusBar.currentHeight
      },
      button: {
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        alignSelf: 'stretch',
      },
      buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',

      },
      buttonsContainer: {
        flex:2,
        flexDirection: 'row',
        flexWrap:'wrap'
      }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);