import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native'
import s from '../../style/styleSheet';
import colors from '../../style/colors';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { getContacts, addContact } from '../../../redux/actions/contact';
import List from './List';
import { bn, NoScrollContainer, Scroll, Container, Label, Input, Button } from '../../Quantum';

function Index({ token, user, getContacts, contacts, isFetching, addContact, navigation }) {
    
    const { control, errors, handleSubmit } = useForm();
    const [reload, setReload] = useState(false);
    const [state, setState] = useState({
        filteredContacts: [],
        modalVisible: false,
        display: false
    })
    const [search, setSearch] = useState("")

    const onSubmit = (data) => {
        setState({
            ...state,
            display: true
        })
        addContact(data, token);
        setReload(true);
        setTimeout(() => {
            setState({
                ...state,
                contacts: contacts,
                modalVisible: false,
                display: false
            })
        }, 1000);
    }

    const filterContact = (value) => {
        let search = value.toLowerCase();
        setState({
            ...state,
            filteredContacts: contacts.filter(contact => contact.nickname.toLowerCase().includes(search))
        })
    }

    useEffect(() => {
        getContacts(token);
        setReload(false);
    }, [reload]);

    return (
        <>
            <NoScrollContainer style={{ ...bn("row borderBottom-1-rgba(0,0,0,.1)"), justifyContent: 'space-between' }}>
                <View style={{ width: "80%" }}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onChangeText={(value) => {
                                    filterContact(value);
                                    setSearch(value)
                                }
                                }
                                style={bn("borderRadius-90")}
                                onBlur={onBlur}
                                value={search}
                                placeholder="Buscar contacto..."
                                autoCapitalize="none"
                            />
                        )}
                        name="filtrar"
                        rules={{ required: false }}
                        defaultValue=""
                    />
                </View>
                <View style={{ width: "15%" }}>
                    <Button disable={state.modalVisible && false} label="+" style={{ ...bn("borderRadius-90"), width: 50, height: 50, justifyContent: "center" }} textStyle={{ ...bn("h3"), marginTop: -5 }} onPress={() => { setState({ ...state, modalVisible: true, filteredContacts: [] }); setSearch("") }} />
                </View>
            </NoScrollContainer>
            <Scroll>

                <View>
                    <List
                        contacts={state.filteredContacts.length || search ? state.filteredContacts : contacts}
                        isFetching={isFetching}
                        token={token}
                        getContacts={getContacts}
                        onClose={() => setReload(true)}
                        navigation={navigation}
                    />
                </View>
            </Scroll>
            <Modal
                transparent={true}
                animationType="slide"
                visible={state.modalVisible}
                onRequestClose={() => {
                    setState({ ...state, modalVisible: false })
                }}
            >
                <Container>
                    <View>
                        <Label text='Alias de Contacto *' style={{ ...s.size(3) }} />
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <Input
                                    style={{ ...s.mt(4), ...s.mb(4) }}
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    value={value}
                                    placeholder="Nombre"
                                    autoCapitalize="none"
                                    editable={!state.display}
                                />
                            )}
                            name="nickname"
                            rules={{ required: "El Alias es obligatorio" }}
                            defaultValue=""
                        />
                        {errors.nickname && <Label text={errors.nickname.message} type='error' />}

                        <Label text='Email *' style={{ ...s.size(3) }} />
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
                                    editable={!state.display}
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
                        <ActivityIndicator animating={state.display} size="large" color={colors.pink} />
                        <Button label='Agregar'
                            onPress={handleSubmit(onSubmit)}
                            disabled={state.display} />
                        <View>
                            <Label style={{ ...s.textCenter, fontSize: 15 }} text='Si el usuario no tiene Quantum se le enviara una invitación' />

                            <Label text='(*Campos obligatorios)' style={s.size(2.5)} />
                        </View>
                    </View>
                </Container>
            </Modal>
        </>
    )
}
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
        getContacts: token => dispatch(getContacts(token)),
        addContact: (data, token) => dispatch(addContact(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);