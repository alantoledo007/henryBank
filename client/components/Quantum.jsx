import React,{useState, useEffect} from 'react';
import {
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    View,
    ScrollView,
    StatusBar as statusBar,
    Dimensions,
    // useColorScheme
} from 'react-native';
import useBootnative from 'bootnative';
import s from './style/styleSheet';
import { StatusBar } from 'expo-status-bar';
import { useHeaderHeight } from '@react-navigation/stack';

import useColorScheme from './useCustomTheme'


export const bootnative = useBootnative; //este no

export const defaultColors = {
    primary: "#E94560", //rgb(233, 69, 96)
    secondary: "#6C757D",
    success: "#51A846",
    danger: "#DD4145",
    waring: "#FBC230",
    info: "#3DA3B9",
    light: "#F8F9FA",
    dark: "#343A40",
    white: "#ffffff",
    
    blue: "#057AFC",
    indigo: "#7066F2",
    purple: "#7152C1",
    pink: "#E9548C",
    red: "#DD4145",
    orange: "#F37D30",
    yellow: "#FBC230",
    green: "#51A846",
    teal: "#5CCA98",
    cyan: "#3DA3B9",
}

export const bn = useBootnative({colors:defaultColors}); //este si

export const darkColors= {
    body: defaultColors.dark,
    label: "rgba(255,255,255, .7)",
    labelErrorBg: "rgba(221, 65, 69, .2)",
    labelError:defaultColors.danger,
    link: "rgba(255,255,255, .5)",

    stats: 'rgba(79, 95, 125, 1)',
    accounts: 'rgb(233, 69, 96)',
    sidebar: '#516375',
    cardbg: 'red',
    
    toastdangerBg: "rgba(0, 0, 0, .9)",
    toastdangerText2: "rgba(255, 255, 255, .5)",
    toastsuccessBg: "rgba(0, 0, 0, .9)",
    toastsuccessText2: "rgba(255, 255, 255, .5)",
    toastinfoBg: "rgba(0, 0, 0, .9)",
    toastinfoText2: "rgba(255, 255, 255, .5)",
    toastclose: '#fff',

    light2: "rgba(255,255,255, .1)",
    light3: "rgba(255,255,255, .5)",
    inputBg: "#3d4954",
    inputBorder: "rgba(0,0,0, .1)",
    inputBorderFocus: "rgba(255,255,255, .7)",
    inputColor: "rgba(255,255,255, .7)",
}

export const lightColors={
    body: defaultColors.light,
    label: defaultColors.dark,
    labelErrorBg: "rgba(221, 65, 69, .2)",
    labelError:defaultColors.danger,
    link: defaultColors.primary,

    stats: "rgba(230, 239, 255, 1)",
    sidebar: 'light',
    accounts: 'rgb(248, 242, 252)',

    toastdangerBg: "rgba(255,255,255, .9)",
    toastdangerText2: "rgba(0,0,0, .5)",
    toastsuccessBg: "rgba(255,255,255, .9)",
    toastsuccessText2: "rgba(0,0,0, .5)",
    toastinfoBg: "rgba(255,255,255, .9)",
    toastinfoText2: "rgba(0,0,0, .5)",
    toastclose: '#000',

    light2: "#f1f1f1",
    light3: "#999",
    inputBg: "#fff",
    inputBorder: '#999',
    inputColor: "#222",
    inputBorderFocus: defaultColors.primary
}

let bnDark = useBootnative({colors:{...defaultColors,...darkColors}});
let bnLight = useBootnative({colors:{...defaultColors,...lightColors}});

export const hbn = (styles = '',darkMode = 'light') => {
    if(darkMode === 'dark'){
        return bnDark(styles);
    }
    return bnLight(styles);
}

function QTToast(props){
    const theme = useColorScheme();
    const { type, text1, text2, hide} = props;
    const types = {
        error:'danger',
    }
    return (
        <View style={{ ...bn("p-3"),marginTop:(statusBar.currentHeight -30) }}>
            <View style={{ ...hbn('bg-toast'+(types[type]||type)+'Bg borderRadius-5 borderLeft-5-'+(types[type]||type)+' row p-3',theme),alignItems:'center' }}>
                <View style={bn('col-10')}>
                    {text1 && <Text style={{ ...hbn('bold text-'+(types[type]||type),theme),...s.size(4) }}>{text1}</Text>}
                    {text2 && <Text style={{ ...hbn('bold text-toast'+(types[type]||type)+'Text2',theme),...s.size(3) }}>{text2}</Text>}
                </View>
                <View style={bn('col-2')}>
                    <Button label="x" color="transparent" textStyle={hbn('text-toastclose',theme)} onPress={hide} />
                </View>
            </View>
        </View>
    );
}

export const toastConfig =  {
    error:(internalState) => {
        return <QTToast {...internalState} type="danger" />
    },
    success:(internalState) => {
        return <QTToast {...internalState} type="success" />
    },
    info:(internalState) => {
        return <QTToast {...internalState} />
    }
}


export function NoScrollContainer({children, style}){
    const theme = useColorScheme();
    
    return (
                   <View style={{...hbn('p-3 bg-body',theme), ...style}}>
                {children}
            </View>
    );
}

export function Scroll({children, style}){
    const theme = useColorScheme();
    
    return (
                   <ScrollView style={{...hbn('px-3 bg-body',theme), ...style}}>
                {children}
            </ScrollView>
    );
}

export function Container({children, style, wihtHeader=false}){
    const theme = useColorScheme();
    const headerHeight = useHeaderHeight() || null;
    console.log(theme)
    return (
        <ScrollView>
            <View style={{ ...hbn('container p-3 bg-body',theme),
            height: wihtHeader ? Dimensions.get('window').height - headerHeight : (Dimensions.get('window').height), 
            justifyContent:'center',...style
            }}>
                {children}
            </View>
            <StatusBar backgroundColor={theme === 'dark' ? 'rgba(23,22,23, .9)' : 'rgba(255, 255, 255, .9)'} style="auto" />
        </ScrollView>
    );
}

export function Label(props){
    const theme = useColorScheme();

    return <Text {...props} style={{ ...s.size(4),...hbn('text-label mb-1',theme),...(props.type==='error' ? {...s.size(2.5),...hbn('border-1-danger-solid-5 mt-1 p-1 text-center bg-labelErrorBg text-labelError',theme) }:{})/*,...s.font*/,...props.style }}>{props.text}</Text>
}

export function Alert({variant, content, style, textStyle}){
    const theme = useColorScheme();
    return (
        <View style={bn('row')}>
            <View style={{ ...hbn('col-12 p-3 bg-'+(variant||'light2')+' borderRadius-5 mt-5',theme),...style }}>
                <Text style={{ ...hbn('text-center text-light3',theme),...s.size(3.5),...textStyle }}>{content}</Text>
            </View>
        </View>
    );
}

export function Logo({size, style}){
    const styles = {
        lg:{
            height:160,
            width:155
        },
        sm: {
            height:100,
            width: 95,
        },
        xs: {
            height:34,
            width:32
        }
    }
    return (
        <Image source={require('../LogoLight.png')} style={{ ...styles[size||'sm'], alignSelf: "center",...style }}></Image>
    );
};

export function DefaultButton({label, color, onPress, style, textStyle, editable, outline, disabled}){
    const colorScheme = useColorScheme();

    const defaultStyles = {
        ...hbn((outline ? 'border-1-primary-solid ' : '') + 'borderRadius-5 p-3.5 bg-'+(color || 'primary'), colorScheme)
    }


    return (
        <TouchableOpacity
            editable={editable}
            style={{ ...defaultStyles,...style }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{ ...hbn('bold text-'+(outline ? outline : 'white')+' text-center',colorScheme),textTransform:'uppercase',...textStyle, ...s.font }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export function Button(props){
    const {to, navigation, params} = props;
    if(to && navigation)
        return <DefaultButton {...props} onPress={()=>navigation.navigate(to, params||{})} />
    return <DefaultButton {...props} />
}

function DefaultLink(props){
    const theme = useColorScheme();
    const {label, style} = props;
    return (
        <TouchableOpacity {...props}>
            <Text style={{ ...hbn('text-link text-center',theme),textDecorationLine:'underline',...style }}>{label}</Text>
        </TouchableOpacity>
    );
}

export function QTLink(props){
    const {to, navigation, params} = props
    if(to && navigation)
        return <DefaultLink {...props} onPress={() => navigation.navigate(to, params||{})} />
    return <DefaultLink {...props} />
}

export function Input({placeholder, style,secureTextEntry, onFocus ,onChangeText, value,onIconRightPress, autoCapitalize, editable, keyboardType, onBlur, iconRight = null}){
    const theme = useColorScheme();

    const [focused, setFocused] = useState(false);
    
    const focusStyles ={
        shadowOffset:{  width: 0,  height: 0,  },
        shadowOpacity: 1.0,
        elevation:15
    }
    
    const onBlurDefault = cb => {
        return () => {
            setFocused(false);
            if(typeof cb === 'function') cb();
        }
    }

    const onFocusDefault = cb => {
        return () => {
            setFocused(true);
            if(typeof cb === 'function') cb();
        }
    }

    
    return (
        <View>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={{
                        ...hbn('p-3 border-1-inputBorder-solid-5 bg-inputBg text-inputColor', theme),
                        ...(focused ? {...hbn('borderColor-inputBorderFocus bg-inputBg',theme)} :{}),
                        ...iconRight ? {paddingRight:45} : {},
                        ...s.size(3.5),
                        ...style
                    }}
                selectionColor={theme === 'dark' ? 'rgba(255,255,255,.2)' : defaultColors.primary}
                placeholderTextColor={theme === 'dark' ? darkColors.light2 : "#d9d9d9"}
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