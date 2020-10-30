import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
// Redux
import { connect } from 'react-redux';
import { switchTheme } from '../../redux/actions/theme';

import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconsMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsMCI2 from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { hbn } from '../Quantum';
import useColorScheme from '../useCustomTheme';
// import { useColorScheme } from 'react-native';

function DrawerContent(props) {
    const { user, navigation, switchTheme, currentReduxTheme } = props
    // const [ isDarkTheme, setIsDarkTheme ] = useState(false);
    const theme = useColorScheme();

    const toggleTheme = () =>{
        // setIsDarkTheme(!isDarkTheme);
        if(theme == 'light'){
            switchTheme('dark');
        }
        if(theme == 'dark'){
            switchTheme('light');
        }
    }
    
    // console.log(user)
    return (
        <View style={{...hbn('bg-sidebar',theme), flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate("Mi Perfil")}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={{ uri: user.avatar }}
                                />
                                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                    <Title>{user.name} {user.surname}</Title>
                                    <Caption>{user.email}</Caption>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Drawer.Section title='General'>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='dashboard'
                                        color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                label='Tablero'
                                onPress={ () => navigation.navigate('Dashboard')}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <IconsMCI2
                                        name='logo-usd'
                                        color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                label='Mis cuentas'
                                onPress={ () => navigation.navigate('Cuentas')}
                            />
                            
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <IconsMCI
                                        name='bank-transfer'
                                        color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                label='Movimientos'
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                onPress={ () => navigation.navigate('Transferencias')}
                            />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <IconsMCI2

                                        name='ios-stats'
                        
                            color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                label='Estadísticas'
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                onPress={ () => navigation.navigate('Estadísticas')}
                            />
                        </Drawer.Section>
                        <Drawer.Section title="Otros">
                        <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='team'
                        
                            color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                label='Contactos'
                                onPress={ () => navigation.navigate('Contactos')}
                            />
                            <DrawerItem
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                icon={({ color, size }) => (
                                    <IconsMCI
                                        name='bank-transfer-in'
                        
                            color={theme === 'dark' ? '#fff' : '#000'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                                label='Recarga'
                                onPress={ () => navigation.navigate('Recarga')}
                            />
                        </Drawer.Section>
                        <Drawer.Section title='Preferencias'>
                            <TouchableRipple onPress={() => { toggleTheme() }}>
                                <View style={styles.preference}>
                                    <Text style={{ color:theme === 'dark' ? '#fff' : '#000' }}>Tema Oscuro</Text>
                                    <View pointerEvents="none">
                                        <Switch value={currentReduxTheme == "dark"} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.botomDrawerSection}>
                <DrawerItem
                    labelStyle={{ color:theme === 'dark' ? '#fff' : '#000' }}
                    icon={({ color, size }) => (
                        <Icon
                            name='logout'
            
                            color={theme === 'dark' ? '#fff' : '#000'}
                            size={size}
                        />
                    )}
                    label='Cerrar Sesión'
                    onPress={ () => navigation.navigate('Logout')}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingTop: 15
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        currentReduxTheme: state.theme.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchTheme: theme => dispatch(switchTheme(theme))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)