import React,{useState} from 'react';
import {TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, Image, View, ScrollView,StatusBar as statusBar} from 'react-native';
import useBootnative from 'bootnative';
import {Link} from 'react-router-native';
import s from './style/styleSheet';
import { StatusBar } from 'expo-status-bar';
import {Dimensions} from 'react-native';
import {BoxShadow as Shadow} from 'react-native-shadow'


const bn = useBootnative();
export const bootnative = useBootnative;

export function Container({children, styles}){
    return (
        <ScrollView>
            <View style={{ ...bn('container p-3 bg-light'),height:(Dimensions.get('window').height + statusBar.currentHeight), justifyContent:'center',...styles}}>
                {children}
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

export function Button({label, color, onPress, style, textStyle, editable}){
    return (
        <TouchableOpacity
            editable={editable}
            style={{ ...bn('borderRadius-5 p-3.5 bg-'+(color || 'primary')),...style }}
            onPress={onPress}
        >
            <Text style={{ ...bn('bold text-white text-center'),textTransform:'uppercase',...textStyle }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export function QTLink({to, label, style}){
    return (
        <Link to={to} component={TouchableOpacity}>
            <Text style={{ ...bn('text-primary text-center'),textDecorationLine:'underline',...style }}>{label}</Text>
        </Link>
    );
}

export function Input({placeholder, style,secureTextEntry, onFocus ,onChangeText, value,onIconRightPress, autoCapitalize, editable, keyboardType, onBlur, iconRight = null}){
    const defaultStyles = {
        ...bn('p-3 border-1-#999-solid-5 bg-white'),
    }
    const blurStyles = {
        ...defaultStyles
    }
    
    const focusStyles = {
        ...defaultStyles,
        ...bn('borderColor-primary'),
        shadowOffset:{  width: 0,  height: 0,  },
        shadowOpacity: 1.0,
        elevation:15
    }

    const [styles,setStyles] = useState(blurStyles);
    
    const onBlurDefault = cb => {
        return () => {
            setStyles(blurStyles);
            if(typeof cb === 'function') cb();
        }
    }

    const onFocusDefault = cb => {
        return () => {
            setStyles(focusStyles);
            if(typeof cb === 'function') cb();
        }
    }
    return (
        <View>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={{ ...defaultStyles,...styles,...iconRight ? {paddingRight:45} : {}, ...s.size(3.5),...style }}
                onBlur={onBlurDefault(onBlur)}
                onFocus={onFocusDefault(onFocus)}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                editable={editable} 
            />
            {iconRight && <TouchableOpacity style={{ ...bn('p-2 py-4'),position:'absolute', right:0, top:0,elevation:20 }} onPress={onIconRightPress}>
                    <Image
                        style={{ ...bn('width-20'), height:20 }}
                        source={iconRight}
                    />
                </TouchableOpacity>}
        </View>
    );
}