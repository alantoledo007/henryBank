import React from 'react'
import { View, StyleSheet } from 'react-native'
// Redux
import { connect } from 'react-redux';

import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconsMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Label } from '../Quantum';
import { useState } from 'react';

function DrawerContent(props) {
    const { user, navigation } = props
    const [ isDarkTheme, setIsDarkTheme ] = useState(false);

    const toggleTheme = () =>{
        setIsDarkTheme(!isDarkTheme);
    }
    
    // console.log(user)
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: user.avatar }}
                            />
                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                <Title>{user.name} {user.surname}</Title>
                                <Caption>{user.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Drawer.Section title='Secciones'>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='dashboard'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Dashboard'
                                onPress={ () => navigation.navigate('Dashboard')}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name='team'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Contactos'
                                onPress={ () => navigation.navigate('Contactos')}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <IconsMCI
                                        name='bank-transfer-in'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Recarga'
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <IconsMCI
                                        name='bank-transfer'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label='Transferencia'
                            />
                        </Drawer.Section>
                        <Drawer.Section title='Preferencias'>
                            <TouchableRipple onPress={() => { toggleTheme() }}>
                                <View style={styles.preference}>
                                    <Text>Tema Oscuro</Text>
                                    <View pointerEvents="none">
                                        <Switch value={isDarkTheme} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.botomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='logout'
                            color={color}
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
        flex: 1,
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
    }
}
export default connect(mapStateToProps)(DrawerContent)