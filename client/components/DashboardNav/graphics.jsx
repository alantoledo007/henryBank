import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { View, TextInput, Button, ScrollView, Text, AppRegistry, processColor,
    TouchableOpacity, StyleSheet, Modal, TouchableHighlight} from 'react-native';
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
  import { Dimensions } from "react-native";



const Graphics = () => {

    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

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
                <Text style={{...s.font, ...s.textWhite, ...s.textCenter, ...s.size(6)}}>Estadísticas</Text>


                <View >
                    <Text style={{...s.font, ...s.textWhite, ...s.textCenter, ...s.size(3)}}>Bezier Line Chart</Text>
                    
                    <LineChart
                        data={data}
                        width={360} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
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
                        }}
                        bezier
                        style={{
                        marginVertical: 30,
                        borderRadius: 5,
                        }}
                    />
                </View>

               
            </ScrollView>
        </View>
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
