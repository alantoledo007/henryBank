//general
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../env';
import { useHistory, Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View, TextInput, Button, ScrollView, Text, TouchableOpacity,
    Picker, StyleSheet, Modal, TouchableHighlight, TouchableWithoutFeedback, Image
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import validator from 'email-validator';

//redux
import { connect } from "react-redux";

//UI
import s from '../style/styleSheet';

const SendMoney = (props) => {

    const { token, balance, close } = props;

    const history = useHistory()
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Contactos');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [money, setMoney] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [friends, setFriends] = useState([]);
    const [flag, setFlag] = useState(false);
    const [find, setFind] = useState(false);
    const [invite, setInvite] = useState('')

    const contancts = () => {
        axios.get(`${env.API_URI}/contacts`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.data.length === 0) {
                    setSelectedValue('Sin contactos')
                    setFlag(true)
                }
                setFriends(response.data.data)
                setFlag(true)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const format = amount => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    const [error, setError] = useState("");
    const mostrarError = (err) => {
        setError(err);
        setTimeout(() => {
            setError("");
        }, 3000)
    };

    function next() {
        if (selectedValue === 'Contactos' || selectedValue === 'Sin contactos' || selectedValue === 'Enviar sin agendar') {
            return mostrarError('Debe ingresar un contacto')
        }
        if (find === true) {
            if (validator.validate(selectedValue) === false) {
                return mostrarError('No es un email valido')
            }
        }
        if (toggleCheckBox === false) {
            return mostrarError('Debe aceptar los terminos')
        }
        if (money === 0 || money === null || money === undefined) {
            return mostrarError('Debe ingresar el valor de la transferencia')
        }
        if (money < 100) {
            return mostrarError('Transferencia minima de 100 pesos')
        }
        if (isNaN(money)) {
            return mostrarError('El valor debe ser un número')
        }

        const payload = {
            amount: money,
            description: description,
            identifier: selectedValue,
        }

        axios.post(`${env.API_URI}/transactions/newtransaction`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setTitle(response.data.title)
                setModalVisible(true)
            })
            .catch((error) => {
                if (error.message.includes('409')) {
                    setTitleError('Dinero insuficiente')
                }
                if (error.message.includes('402')) {
                    setTitleError('Destino incorrecto')
                }
                if (error.message.includes('500')) {
                    setTitleError('No es un usuario de Quantum')
                    setInvite(true)
                }
                setModalVisible(true)
            })

    }
    useEffect(() => {
        flag === false ?
            contancts()
            : {}
    });

    const back = () => {
        setFind(false),
            setSelectedValue('Contactos')
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
            <ScrollView style={{ width: '100%' }}>

                <View style={{ marginBottom: 15, alignSelf: "flex-end" }}>
                    {close && <TouchableWithoutFeedback onPress={close}>
                        <Image style={{ height: 15 }} source={require("../../assets/close-pink.png")} />
                    </TouchableWithoutFeedback>}
                </View>


                <Text style={{ ...s.textWhite, ...s.textCenter, ...s.size(8), ...s.p(2) }}>
                    Enviar dinero
            </Text>

                <Text style={{ ...s.textWhite, ...s.size(4), ...s.py(2) }}
                    onPress={() => back()}>Contacto</Text>

                {find === false ? <View style={{ ...s.input, justifyContent: "center" }}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => itemValue === 'Enviar sin agendar' ? setFind(true) :
                            setSelectedValue(itemValue)}>
                        {selectedValue === 'Contactos' || selectedValue === 'Sin contactos' ? <Picker.Item label={selectedValue} value={selectedValue} /> : <Picker.Item label='' value='' />}
                        <Picker.Item label='Enviar sin agendar' value='Enviar sin agendar' key='Buscar...' />

                        {friends && friends.map((x) => (
                            <Picker.Item label={x.nickname} value={x.contact_id} key={x.nickname} />

                        ))}
                    </Picker>
                </View> :
                    <View >
                        <TextInput style={{ ...s.input }}
                            placeholder='Correo electrónico'
                            onChangeText={email => setSelectedValue(email)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>}

                <Text style={{ ...s.textWhite, ...s.textCenter, ...s.py(5) }}>Balance actual:
                    {balance ? ` $ ${format(balance)} ` : '$0.00'}</Text>

                <View style={{ ...s.my(4), justifyContent: 'center', alignItems: 'center', height: 50 }}>
                    <Text style={{ ...s.textWhite, ...s.size(7), ...s.textCenter }}>
                        $ {format(money)}
                    </Text>
                    <TextInput
                        style={{
                            ...s.size(7), borderColor: 'rgba(0,0,0,0.0)',
                            color: 'rgba(0,0,0,0.0)', width: '70%', height: 50, textAlign: 'center',
                            marginTop: -50
                        }}
                        onChangeText={money => setMoney(parseInt(money))}
                        keyboardType='number-pad' />
                </View>

                <Text style={{ ...s.textWhite, ...s.size(4), ...s.py(1) }}>¿Quieres decirle algo?</Text>
                <TextInput style={{ ...s.input, height: 60 }} multiline={true}
                    maxLength={100} onChangeText={text => setDescription(text)}
                    placeholder='Escribe tu mensaje aquí'
                />


                <View style={styles.checkboxContainer}>
                    <View>
                        <View style={{
                            backgroundColor: 'white', width: 15, height: 15, position: 'absolute', marginLeft: 8.5,
                            borderRadius: 2, marginTop: 8.5
                        }}></View>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}

                        />
                    </View>
                    <Text style={{ ...s.textWhite }}>Acepto términos y condiciones para realizar esta transferencia.</Text>
                </View>

                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

                <View>
                    <TouchableOpacity style={{ ...s.btn() }} onPress={() => next()} >
                        <Text style={{ ...s.textWhite, ...s.textButton() }}>Enviar</Text>
                    </TouchableOpacity>
                </View>

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

                            <Text style={{ ...styles.modalText, color: '#FFBD69', fontSize: 40 }}>{title ? 'Transferencia exitosa.' :
                                'Transferencia fallida'}</Text>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#221F3B',
                                width: 220,
                                margin: 10
                            }} />
                            <Text style={{ ...styles.modalText, color: '#221F3B', ...s.size(4) }}>{title ? title :
                                titleError}</Text>

                            {invite ? <TouchableHighlight
                                onPress={close}
                            >
                                <Text style={{ ...styles.modalText, color: '#FFBD69', ...s.size(4) }}>¿Deseas invitarlo a Quantum?</Text>
                            </TouchableHighlight>
                                : null}



                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#E94560" }}
                                onPress={close}
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
    checkboxContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        marginBottom: 30
    },
    errorMessage: {
        color: '#E94560',
        alignSelf: "center",
        paddingVertical: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: '#E94560'
    },
})

function mapDispatchToProps(state) {
    return {
        token: state.auth.token,
        balance: state.auth.user.balance
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapDispatchToProps, mapStateToProps)(SendMoney);

