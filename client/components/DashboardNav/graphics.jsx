import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { View, TextInput, ScrollView, Text, AppRegistry, processColor,
    TouchableOpacity, StyleSheet, Modal, TouchableHighlight, Dimensions} from 'react-native';
import { connect } from "react-redux";

//Estilo
import s from '../style/styleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {Container, Logo, bootnative, QTLink, Button, Alert, Label, Input} from '../Quantum';



const Graphics = () => {

    //const screenWidth = Dimensions.get("window").width;
    const screenWidth = 350;
    const chartConfig= {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#E94560",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 0,
            justifyContent: 'flex-end',
            color: 'blue'
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
        }


    const [week, setWeek] = useState(false);
    const [month, setMonth] = useState(false);
    const [day, setDay] = useState(false);

    const open = (state, set) => {
        setWeek(false)
        setMonth(false)
        setDay(false)
        state === false ? set(true) : set(false)
    }


//Prueba ----------------------------------------------------
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 4) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Tabla Mensual"] // optional
      };
      const dataDos = {
        labels: ["Ingresos: 40.000", "Egresos: 60:000", "Resumen: -20.000"], // optional
        data: [0.4, 0.6, 0.2],
        legend: ["Dia Jueves"] // optional
      };

    return (

        <Container>
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            /> */}
           
                <Text style={{...s.textWhite, ...s.textCenter, ...s.size(6), ...s.my(6)}}>Estadísticas</Text>
                <View>
                    <Button 
                    onPress={() => open(day, setDay)}
                    label='Diaria'
                    style={{...s.my(1)}}
                    />
                    
                    { day && <ProgressChart
                                data={dataDos}
                                width={350}
                                height={220}
                                strokeWidth={16}
                                radius={32}
                                chartConfig={chartConfig}
                                hideLegend={false}
                                color='blue'
                                style={{
                                    marginVertical: 20,
                                    borderRadius: 5,
                                    alignContent:'flex-start',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    color: 'blue'
                                    
                                    }}
                                />
                    
                    }
                </View>
                <View>
                    <Button 
                    onPress={() => open(week, setWeek)}
                    label='Semanal'
                    style={{...s.my(1)}}
                    />
                    
                    { week && <LineChart
                        data={data}
                        width={360} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                        marginVertical: 30,
                        borderRadius: 5,
                        justifyContent:'center', alignItems:'center'
                        }}
                    />}
                </View>
                <View>
                    <Button 
                    onPress={() => open(month, setMonth)}
                    label='Mensual'
                    style={{...s.my(1)}}
                    />
                    
                    { month && <LineChart
                        data={data}
                        width={360} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                        marginVertical: 30,
                        borderRadius: 5,
                        justifyContent:'center', alignItems:'center'
                        }}
                    />}
                </View>    

           
           
        </Container>
    )
}





function mapDispatchToProps() {
    return {
        
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Graphics);
