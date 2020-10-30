import React, { useState, useEffect } from 'react'

//api
import axios from 'axios';
import env from '../../../env';

//redux
import { connect } from 'react-redux';
import { updateUserInfo, updateBalances } from '../../../redux/actions/auth';

//ui
import colors from '../../style/colors';
import { View, Text, ActivityIndicator } from 'react-native'
import { bn, Container, hbn, Label, QTLink, toastConfig } from '../../Quantum';
import { TabBar, TabView, Tab, Modal, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";
import Toast from 'react-native-toast-message';

import currency from '../../currency';

const DollarsTab = ({ token, navigation, USDbalance, ARSbalance, updateBalances }) => {

    const [dis, setDis] = useState(false);
    const [done, setDone] = useState(false);

    const initialState = {
        usdAmount: 0,
        usdToArs: 0,
        confirm: false,
        termsAccepted: false
    }
    const [state, setState] = useState(initialState)

    const [visibleBuy, setVisibleBuy] = useState(false);
    const [visibleSell, setVisibleSell] = useState(false);

    const requestBuySell = () => {
        //Mínimo de 200 pesos en tu cuenta ARS para poder solicitar compra de dólares
        if (visibleBuy && ARSbalance < 200) {
            return Toast.show({
                type: "error",
                text1: "Solicitud de compra rechazada",
                text2: "Se requiere un balance mínimo de $ 200 en tu cuenta ARS para poder comprar USD."
            });
        }
        if (visibleSell && USDbalance < state.usdAmount) {
            return Toast.show({
                type: "error",
                text1: "Solicitud de venta rechazada",
                text2: "No tienes saldo suficiente en tu cuenta USD."
            });
        }

        //Si no hay ningun problema, seteamos confirm a true para que el usuario acepte las condiciones y concrete la compra
        setState({
            ...state,
            confirm: true
        });
    }

    const handleBuy = () => {
        setDis(true);
        const amount = parseInt(state.usdAmount)
        const formatedAmount = currency(amount, "usd")
        axios.post(`${env.API_URI}/dollars/buy`, JSON.stringify({ amount }), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.data)
            .then((res) => {
                // console.log('RESPUESTA COMPRA DOLARES', res);
                updateBalances(res);
                setDis(false);
                setDone(true);
                Toast.show({
                    type: "success",
                    text1: "¡Listo!",
                    text2: `Compraste ${formatedAmount}`,
                    onHide: cancel
                })
            })
            .catch(err => {
                setDis(false);
                // console.log(err.response.data.code)
                //Manejo de errores
                if (err.response.data.code == 403) {
                    return Toast.show({
                        type: "error",
                        text1: "No se realizó la compra",
                        text2: "No tienes saldo suficiente en tu cuenta ARS."
                    })
                }
                //417 si la API de precio de dolar llegó al límite de requests
                if (err.response.data.code == 417) {
                    setDone(true);
                    return Toast.show({
                        type: "error",
                        text1: "Hubo un problema y no se realizó la compra.",
                        text2: "Por favor inténtalo de nuevo en una hora.",
                        onHide: cancel
                    })
                }
                return Toast.show({
                    type: "error",
                    text1: "Hubo un error.",
                    text2: "Por favor, vuelve a intentarlo más tarde o ponte en contacto con el soporte.",
                    onHide: cancel
                })
            })
    }

    const handleSell = () => {
        setDis(true);

        const amount = parseInt(state.usdAmount);
        axios.post(`${env.API_URI}/dollars/sell`, JSON.stringify({ amount }), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.data)
            .then((res) => {
                // console.log('RESPUESTA VENTA DOLARES',res)
                const gananciaARS = currency(res.arsGained)

                updateBalances(res.newBalances);
                setDis(false);
                setDone(true);
                Toast.show({
                    type: "success",
                    text1: "¡Listo!",
                    text2: `Recibiste ${gananciaARS}`,
                    onHide: cancel
                })
            })
            .catch(err => {
                setDis(false);
                setDone(true);
                console.log(err.response.data.code)
                if (err.response.data.code == 403) {
                    return Toast.show({
                        type: "error",
                        text1: "No se realizó la compra",
                        text2: "Saldo insuficiente en tu cuenta USD.",
                        onHide: cancel
                    })
                }
                if (err.response.data.code == 417) {
                    return Toast.show({
                        type: "error",
                        text1: "Hubo un problema y no se realizó la compra",
                        text2: "Por favor, volvé a intentarlo en una hora.",
                        onHide: cancel
                    })
                }
                return Toast.show({
                    type: "error",
                    text1: "Hubo un error",
                    text2: "Por favor, revisá tu conección a internet o contactá con soporte.",
                    onHide: cancel
                })
            }
            )
    }



    const cancel = () => {
        setVisibleBuy(false);
        setVisibleSell(false);
        setState(initialState);
        setDis(false);
        setDone(false);
    };


    return (<Layout style={{ flex: 1, ...bn('py-6 px-6') }}>
        <KText category='h2' style={bn('mb-4 text-center')}>{currency(USDbalance, "usd")}</KText>
        <View style={bn('row')}>
            <View style={bn('col-6 pr-2')}>
                <Button size="small" onPress={() => setVisibleBuy(true)}>
                    COMPRAR
                </Button>
            </View>
            <View style={bn('col-6 pl-2')}>
                <Button size="small" appearance="outline" onPress={() => setVisibleSell(true)}>
                    VENDER
                </Button>
            </View>
        </View>
        {/* MODAL COMPRA DOLARES */}
        <Modal visible={visibleBuy}
            backdropStyle={bn('bg-rgba(0,0,0,.5)')}
            style={bn('container px-6')}>
            <Card tyle={{ ...bn('row') }}>
                {
                    !state.confirm ?
                        //PEDIR COMPRA
                        <>
                            <KText category="h2" style={bn('mb-4')}>Comprar USD</KText>
                            <View style={bn('col-12 mb-4')}>
                                <Input
                                    label="Ingrese un monto"
                                    placeholder='US$ 0.00'
                                    onChangeText={value => setState({
                                        ...state,
                                        usdAmount: value,
                                    })}
                                    keyboardType="number-pad"
                                    textAlign="center"
                                />
                            </View>
                            <View style={bn('col-12')}>
                                <Button style="w-100%" onPress={requestBuySell} disabled={state.usdAmount == 0}>

                                    {dis ? <ActivityIndicator style={{ marginBottom: 3 }} animating={dis} size="small" color={colors.pink} /> : "CONTINUAR"}
                                </Button>
                            </View>
                            <View style={bn('col-12')}>
                                <Button appearance="ghost" onPress={cancel}>
                                    CANCELAR
                            </Button>
                            </View>
                        </>
                        :
                        // CONFIRMAR COMPRA
                        <>
                            <KText category="h2" style={bn('mb-4')}>Comprar USD</KText>
                            <View style={{ ...bn('col-12 mb-4'), flexDirection: "row" }}>
                                <CheckBox
                                    disabled={false}
                                    value={state.termsAccepted}
                                    onValueChange={(newValue) => setState({
                                        ...state,
                                        termsAccepted: newValue
                                    })}
                                />
                                <KText>Acepto los términos y condiciones de Quantum</KText>
                            </View>

                            <View style={bn('col-12')}>
                                <Button style="w-100%" onPress={handleBuy} disabled={!state.termsAccepted || dis || done}>
                                    {dis ? <ActivityIndicator style={{ marginBottom: 3 }} animating={dis} size="small" color={colors.pink} /> : "CONFIRMAR"}
                                </Button>
                            </View>
                            <View style={bn('col-12')}>
                                <Button appearance="ghost" onPress={cancel} >
                                    CANCELAR
                            </Button>
                            </View>
                        </>
                }
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </Card>
        </Modal>
        {/* MODAL VENTA DOLARES */}
        <Modal
            visible={visibleSell}
            backdropStyle={bn('bg-rgba(0,0,0,.5)')}
            style={bn('container px-6')}
        //Como era la prop para afectar el comportamiento del botón de volver del teléfono?
        //Habría que usarla acá para que se pueda salir del modal apretando volver
        >
            <Card tyle={{ ...bn('row') }}>
                {
                    !state.confirm ?
                        //PEDIR VENTA
                        <>
                            <KText category="h2" style={bn('mb-4')}>Vender USD</KText>
                            <View style={bn('col-12 mb-4')}>

                                <Input
                                    label="Ingrese un monto"
                                    placeholder='US$ 0.00'
                                    onChangeText={value => setState({
                                        ...state,
                                        usdAmount: value,
                                    })}
                                    keyboardType="number-pad"
                                    textAlign="center"
                                />
                            </View>
                            <View style={bn('col-12')}>
                                <Button style="w-100%" onPress={requestBuySell} disabled={state.usdAmount == 0}>
                                    {dis ? <ActivityIndicator style={{ marginBottom: 3 }} animating={dis} size="small" color={colors.pink} /> : "CONTINUAR"}
                                </Button>
                            </View>
                            <View style={bn('col-12')}>
                                <Button appearance="ghost" onPress={cancel}>
                                    CANCELAR
                            </Button>
                            </View>
                        </>
                        :
                        // CONFIRMAR VENTA
                        <>
                            <KText category="h2" style={bn('mb-4')}>Vender USD</KText>
                            <View style={{ ...bn('col-12 mb-4'), flexDirection: "row" }}>
                                <CheckBox
                                    disabled={false}
                                    value={state.termsAccepted}
                                    onValueChange={(newValue) => setState({
                                        ...state,
                                        termsAccepted: newValue
                                    })}
                                />
                                <KText>Acepto los términos y condiciones de Quantum</KText>

                            </View>
                            <View style={bn('col-12')}>
                                <Button style="w-100%" onPress={handleSell} disabled={!state.termsAccepted || dis || done}>
                                    {dis ? <ActivityIndicator style={{ marginBottom: 3 }} animating={dis} size="small" color={colors.pink} /> : "CONFIRMAR"}
                                </Button>
                            </View>
                            <View style={bn('col-12')}>
                                <Button appearance="ghost" onPress={cancel} >
                                    CANCELAR
                            </Button>
                            </View>
                        </>
                }
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </Card>
        </Modal>
    </Layout>);
};

function mapStateToProps(state) {
    return {
        accounts: state.auth.user.accounts,
        token: state.auth.token,
        USDbalance: state.auth.user.accounts.find(acc => acc.currency === "usd").balance,
        ARSbalance: state.auth.user.accounts.find(acc => acc.currency === "ars").balance
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateUserInfo: data => dispatch(updateUserInfo(data)),
        updateBalances: data => dispatch(updateBalances(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DollarsTab);
