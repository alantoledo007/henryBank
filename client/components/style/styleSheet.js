import { StyleSheet, StatusBar } from 'react-native';
import colors from './colors';
import vars from './vars';

export const styles = { //por si se requiere modificar un estilo dentro de un componente en particular.
    container: {
        flex: 1,
        paddingLeft: vars.container_margin,
        paddingRight: vars.container_margin,
        paddingTop: vars.container_margin,
        backgroundColor: colors.blue,
        marginTop: StatusBar.currentHeight
    },
    textWhite: {
        color: "#EBEBEB"
    },

    textCenter: {
        textAlign: "center"
    },

    itemsCenter: {
        alignItems: "center"
    },

    bg: (color = 'transparent') => {
        return {
            backgroundColor: colors[color] || color
        }
    },

    btn: (color = 'pink') => {
        return {
            paddingTop: vars.spacing * 3,
            paddingBottom: vars.spacing * 3,
            borderRadius: vars.radius,
            backgroundColor: colors[color] || color,
            alignItems: 'center'
        }
    },

    model:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 'auto'
    },

    //grid
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    col: (value = 1, offset = 0) => {
        if (value < 1) {
            throw Error('The min value is: 1');
        }
        if (value > 12) {
            throw Error('The max value is: 12');
        }
        return {
            width: (vars.colFragment * value) - (vars.spacing * offset),
        }
    },

    //division-line
    hr: (color, size = 1) => {
        return {
            borderBottomWidth: size,
            borderBottomColor: colors[color] || color
        }
    },

    //font
    size: value => {
        return {
            fontSize: vars.spacing * value
        }
    },

    textColor: color => {
        return {
            color: colors[color] || color
        }
    },


    font: {
        //fontFamily:"Poppins_600SemiBold"
    },

    input: {
        height: 50,
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: vars.radius,
        borderBottomColor: colors.pink,
        borderBottomWidth: 5,
        color:colors.blue,
        fontWeight: 'bold'
    },

    textButton:(color = '#fff') => {
        return {
            color: colors[color] || color,
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },

    //helpers
    my: value => {
        return {
            marginTop: vars.spacing * value,
            marginBottom: vars.spacing * value
        }
    },
    mx: value => {
        return {
            marginLeft: vars.spacing * value,
            marginRight: vars.spacing * value
        }
    },
    mt: value => {
        return {
            marginTop: vars.spacing * value
        }
    },
    mb: value => {
        return {
            marginBottom: vars.spacing * value
        }
    },
    mr: value => {
        return {
            marginRight: vars.spacing * value
        }
    },
    ml: value => {
        return {
            marginLeft: vars.spacing * value
        }
    },
    m: value => {
        return {
            margin: vars.spacing * value
        }
    },
    py: value => {
        return {
            paddingTop: vars.spacing * value,
            paddingBottom: vars.spacing * value
        }
    },
    px: value => {
        return {
            paddingLeft: vars.spacing * value,
            paddingRight: vars.spacing * value
        }
    },
    pt: value => {
        return {
            paddingTop: vars.spacing * value
        }
    },
    pb: value => {
        return {
            paddingBottom: vars.spacing * value
        }
    },
    pr: value => {
        return {
            paddingRight: vars.spacing * value
        }
    },
    pl: value => {
        return {
            paddingLeft: vars.spacing * value
        }
    },
    p: value => {
        return {
            padding: vars.spacing * value
        }
    }
}

export default StyleSheet.create(styles); //estilos procesados