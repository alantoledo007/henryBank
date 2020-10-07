//general
import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

//UI
import s from './style/styleSheet';

function Home() {
    return (
        <ScrollView style={s.container}>
            <View>
                <Image source={require("../Logo.png")} style={{ width: 220, height: 220, alignSelf: "center" }}></Image>
            </View>
            <View style={{ flex: 2, width: "100%" }}>
                <View style={{ width: "100%", ...s.my(5) }}>
                    <Link to="/login" style={s.btn()}>
                        <Text style={{ ...s.textWhite, ...s.size(5) }}>Iniciar sesión</Text>
                    </Link>
                </View>
                <View>
                    <Link to="/register" style={s.btn()}>
                        <Text style={{ ...s.textWhite, ...s.size(5) }}>Registrarse</Text>
                    </Link>
                </View>
                <View opacity={0.5} style={{ ...s.hr('white'), ...s.my(10) }}></View>
                <View>
                    <Link to="/#">
                        <Text style={{ ...s.textCenter, ...s.textColor('orange'), ...s.size(3.5) }}>
                            ¿Necesitás ayuda?
                        </Text>
                    </Link>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);