//general
import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

//UI
import s from './style/styleSheet';
import { LinearGradient } from 'expo-linear-gradient';

function Home() {
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
            <ScrollView>
                <View>
                    <Image source={require("../logoFull.png")} style={{alignSelf: "center" , ...s.mb(8)}}></Image>
                </View>
                <View style={{ flex: 2, width: "100%" }}>
                    <View style={{ width: "100%", ...s.my(5) }}>
                        <Link to="/login" component={TouchableOpacity} style={s.btn()}>
                            <Text style={{ ...s.textWhite, ...s.size(5) }}>Iniciar sesión</Text>
                        </Link>
                    </View>
                    <View>
                        <Link to="/register" component={TouchableOpacity} style={s.btn('white')}>
                            <Text style={{ ...s.textColor('pink'), ...s.size(5) }}>Registrarse</Text>
                        </Link>
                    </View>
                    <View opacity={0.2} style={{ ...s.hr('white',3.5), ...s.mt(10), ...s.mb(4) }}></View>
                    <View>
                        <Link to="/#">
                            <Text style={{ ...s.textCenter, ...s.textColor('orange'), ...s.size(3.5) }}>
                                ¿Necesitás ayuda?
                            </Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
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