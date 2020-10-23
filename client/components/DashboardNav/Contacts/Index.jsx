import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native'
import { Link } from 'react-router-native';
import s from '../../style/styleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';
import env from '../../../env';
import colors from '../../style/colors';
import { Controller, useForm } from 'react-hook-form';
import { ListItem, Avatar } from 'react-native-elements'
import IonIcon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
//actions
import { getContacts } from '../../../redux/actions/contact';

import List from './List';
import { Container, Label, bn, Input, Button } from '../../Quantum';

function Index(props) {
    const { token, user, getContacts, contacts, isFetching } = props;

    // const [ allContacts, setAllContacts ] = useState(null);
    const [ contactsState, setContactsState ] = useState( contacts );
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalError, setModalError ] = useState(null)
    const [ dis, setDis ] = useState(false);
    const { control, errors, handleSubmit } = useForm();

    const onSubmit = data => {
        setDis(true);
        Axios.post(`${env.API_URI}/contacts`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => { 
                getContacts(token)
                console.log('response', response.data.data)
                let partialContacts = contactsState;
                partialContacts.push({ 
                    User: response.data.data.contact, 
                    nickname: response.data.data.nickname,
                })
                console.log(partialContacts);
                setContactsState( partialContacts );
            })
            .then(() => {
                setDis(false);
                setModalVisible(!modalVisible);
                setContactsState
            })
            .catch(err => {
                setDis(false);
                console.log('error de agregancia')
                setModalVisible(!modalVisible);
            })
    }

    const filtrarContactos = nombre => {
        nombre = nombre.toLowerCase()
        setContactsState(contacts.filter(contact => (contact.nickname.toLowerCase().includes(nombre.toLowerCase()))))
    }
    

    useEffect(() => {
        getContacts(token);
        console.log('CONTACTS STATE',contactsState)
    }, [])
    return (
        <Container>
            <View style={{ ...bn('pt-5'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...s.mt(5) }}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            onChangeText={(value) => {
                                filtrarContactos(value)
                                return onChange(value)
                            }}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Busca un contacto..."
                            autoCapitalize="none"
                        />
                    )}
                    name="filtrar"
                    rules={{ required: false }}
                    defaultValue=""
                />
                {/* Agrege Estilos nuevos par el boton de agregar contacto */}
                <View>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                    }} style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: colors.pink, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: colors.white, fontSize: 30, borderStyle: 'solid' }}>+</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={{ ...s.mt(5) }}>
                {/* Contactos */}
                <View style={{ borderBottomColor: colors.pink, borderBottomWidth: 1, ...s.mb(5) }} />
                {contactsState && <List
                    contacts={contactsState}
                    isFetching={isFetching}
                    token={token}
                    getContacts={getContacts}
                />}

            </ScrollView>

            {/* Modal para agregar contactos */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Container style={{ ...s.mt(20), margin: 20, borderRadius: 10, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.7 }} >
                    <View >
                        <Label text='Alias de Contacto *' style={{...s.size(3)}} />
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    style={{...s.mt(4), ...s.mb(4) }}
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="Nombre"
                                    autoCapitalize="none"
                                    editable={!dis}
                                />
                            )}
                            name="nickname"
                            rules={{ required: "El Alias es obligatorio" }}
                            defaultValue=""
                        />
                        {errors.nickname && <Label text={errors.nickname.message} type='error' />}
                        
                        <Label text='Email *' style={{...s.size(3)}} />
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    value={value}
                                    keyboardType="email-address"
                                    placeholder="contacto@example.com"
                                    autoCapitalize="none"
                                    editable={!dis}
                                />
                            )}
                            name="email"
                            rules={{ 
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Dirección de correo inválida",
                                  }, 
                            }}
                            defaultValue=""
                        />
                        {errors.email && <Label text={errors.email.message} type='error' />}
                        <ActivityIndicator animating={dis} size="large" color={colors.pink} />
                        <Button label='Agregar' 
                            onPress={handleSubmit(onSubmit)}
                            disabled={dis}/>
                        <View>
                            <Label style={{...s.textCenter, fontSize: 15 }} text='Si el usuario no tiene Quantum se le enviara una invitación' />
                        
                        <Label text='(*Campos obligatorios)' style={s.size(2.5)} />
                        </View>
                    </View>
                </Container>
            </Modal>
        </Container>
    )
}


// const mapStateToProps = state => {
//     return {
//         token: state.auth.token,
//         user: state.auth.user,
//         contacts: state.contacts.list,
//         isFetching: state.contacts.isFetching
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         getContacts: token => dispatch(getContacts(token)) 
//     }
// }
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        contacts: state.contacts.list,
        isFetching: state.contacts.isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: token => dispatch(getContacts(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);