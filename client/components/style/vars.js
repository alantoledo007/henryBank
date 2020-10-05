import {Dimensions} from 'react-native';

//base vars
const window = Dimensions.get('window')
const spacing =  5;
const container_margin = 30;
const radius = 5; //default all border radius


//dinamics vars
const colFragment= (window.width - (container_margin * 2)) / 12;

export default {
    spacing,
    container_margin,
    colFragment,
    radius,
    window
}