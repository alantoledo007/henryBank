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

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Tabla Mensual"] // optional
      };

    return (

        <Container>
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
                <Text style={{...s.textWhite, ...s.textCenter, ...s.size(6), ...s.my(6)}}>Estadísticas</Text>
                <View>
                    <Button 
                    onPress={() => month === false ? setMonth(true) : setMonth(false) }
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
                <View>
                    <Button 
                    onPress={() => week === false ? setWeek(true) : setWeek(false) }
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
                    onPress={() => day === false ? setMonth(true) : setMonth(false) }
                    label='Diaria'
                    style={{...s.my(1)}}
                    />
                    
                    { day && <LineChart
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

            </ScrollView>
           
            

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
