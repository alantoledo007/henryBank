import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import env from '../../env';
import { View, ScrollView, Dimensions, useColorScheme, StatusBar, Picker} from 'react-native';
import { connect } from "react-redux";
import s from '../style/styleSheet'

//Estilo
import {
    LineChart,
    BarChart
  } from "react-native-chart-kit";
import {Container, Logo, bootnative, QTLink, Button, Alert, hbn, Label, Input, bn, defaultColors} from '../Quantum';
import { useHeaderHeight } from '@react-navigation/stack';


const Graphics = (props) => {
    const headerHeight = useHeaderHeight();
    const theme = useColorScheme();

    const { token } = props;

    //const screenWidth = Dimensions.get("window").width;
    const chartConfig= {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 2, // optional, defaults to 2dp

        propsForDots: {
            r: "4"
        }
        }
    
    const [week, setWeek] = useState(false);
    const [month, setMonth] = useState(false);
    const [day, setDay] = useState(true);
    const [income, setIncome] = useState(true);
    const [period, setPeriod] = useState('daily');
    const [stats, setStats] = useState({
        daily:{data:[0], labels:[""]},
        weekly:{data:[0], labels:[""]},
        monthly:{data:[0], labels:[""]}
    });

    const [filterDay, setFilterDay] = useState(false);
    const [widtDay, setWidtDay] = useState(800);
    
    const filter = (value) => {
        value < 15 ? setWidtDay(800) : setWidtDay(1200);
        value >= 7 && value <= 31 ?
        next(period, income, value) : {};
    }

    useEffect(() => {
        next(period);
    },[period, income]);

    const open = (state, set, period, days) => {
        days ? setFilterDay(true) : setFilterDay(false);
        setPeriod(period)
        setWeek(false)
        setMonth(false)
        setDay(false)
        set(true)
    }


    //Prueba ----------------------------------------------------
    const data = {
        labels: [""],
        datasets: [
          {
            data: [0],
            color: (opacity = 1) => `rgba(233, 69, 96, ${opacity})`, // optional
            strokeWidth: 3, // optional
          }
        ]
      };

    function next(period, income, value) {

        axios.post(`${env.API_URI}/stats`,
            {
                period: period,
                income: income,
                days: value
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
               const data = response.data
               setStats((state) => {
                    return {
                        ...state,
                        [period]:data
                    }
               });
            })
            .catch((error) => {
               console.log(error)
            })

    }

    return (

        <Container wihtHeader={true}>
            <Logo />
            
            <View style={bn('row mt-5')}>
                <View style={bn('col-12')}>
                { day &&
                
                    <ScrollView horizontal={true} 
                        style={hbn('bg-stats borderRadius-5',theme)}>
                        <BarChart
                            renderDotContent={({x, y, index}) => <Label style={{position: 'absolute', fontSize:12, top: y-25, left: x-10}} text={stats.daily.data[index] > 0? stats.daily.data[index] : ''} />}
                            data={{ 
                                labels:stats.daily.labels,
                                datasets:[{
                                    ...data.datasets[0],
                                    data:stats.daily.data
                                }]
                            }}
                            width={widtDay} // from react-native
                            height={250}
                            yAxisLabel="$"
                            //yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{...chartConfig,
                                ...(theme === 'dark' ?{
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
                                    } : {
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
                                        
                                    
                                }) }}
                        bezier
                        style={hbn('m-2',theme)}
                    />
                    </ScrollView>
                }

                { week && <ScrollView horizontal={true} 
                        style={hbn('bg-stats borderRadius-5',theme)}>
                        <BarChart
                            renderDotContent={({x, y, index}) => <Label style={{position: 'absolute', fontSize:12, top: y-25, left: x-10}} text={stats.weekly.data[index] > 0? stats.weekly.data[index] : ''} />}
                            data={{ 
                                labels:stats.weekly.labels,
                                datasets:[{
                                    ...data.datasets[0],
                                    data:stats.weekly.data
                                }]
                            }}
                            width={550} // from react-native
                            height={250}
                            yAxisLabel="$"
                            //yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{...chartConfig,
                                ...(theme === 'dark' ?{
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
                                    } : {
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
                                        
                                    
                                }) }}
                        bezier
                        style={hbn('m-2',theme)}
                    />
                    </ScrollView>}

                { month && <ScrollView horizontal={true} 
                        style={hbn('bg-stats borderRadius-5',theme)}>
                        <BarChart
                            renderDotContent={({x, y, index}) => <Label style={{position: 'absolute', fontSize:12, top: y-25, left: x-10}} text={stats.monthly.data[index] > 0? stats.monthly.data[index] : ''} />}
                            data={{ 
                                labels:stats.monthly.labels,
                                datasets:[{
                                    ...data.datasets[0],
                                    data:stats.monthly.data
                                }]
                            }}
                            width={420} // from react-native
                            height={250}
                            yAxisLabel="$"
                            //yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{...chartConfig,
                                ...(theme === 'dark' ?{
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
                                    } : {
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
                                        
                                    
                                }) }}
                        bezier
                        style={hbn('m-2',theme)}
                    />
                    </ScrollView>}
                </View>
                
            </View>
            <View style={bn('row mt-2')}>
                
                <View style={bn('col-4 pr-1')}>
                    <Button 
                        {...(!day ? {outline:"primary",color:"transparent"}:{})}
                        onPress={() => open(day, setDay, 'daily', 'days')}
                        label='10 Días'
                    />
                </View>
                <View style={bn('col-4 px-1')}>
                <Button 
                    {...(!week ? {outline:"primary",color:"transparent"}:{})}
                    onPress={() => open(week, setWeek,  "weekly")}
                    label='12s'
                    />
                </View>
                <View style={bn('col-4 pl-1')}>
                    <Button
                        {...(!month ? {outline:"primary",color:"transparent"}:{})}
                        onPress={() => open(month, setMonth, "monthly")}
                        label='6M'
                        />
                </View>
                
            </View>

            { filterDay &&  
                            <View style={{...hbn(' my-1 row')}}>
                                <View style={bn('col-12 pr-1 ')}>
                                <Input style={hbn('border-1-primary-solid borderRadius-5 py-2')}
                                        placeholder='También podés filtrar por días '
                                        onChangeText={(value) => filter(parseInt(value))}
                                keyboardType="numeric"/>
                                </View>
                                

                            </View>
            }

            <View style={bn('row mt-2')}>
                
                <View style={bn('col-6 pr-1')}>
                    <Button 
                        {...(!income ? {outline:"primary",color:"transparent"}:{})}
                        onPress={() => setIncome(!income)}
                        label='Ingresos'
                    />
                </View>
                <View style={bn('col-6 pl-1')}>
                    <Button
                        {...(income ? {outline:"primary",color:"transparent"}:{})}
                        onPress={() => setIncome(!income)}
                        label='Gastos'
                        />
                </View>
                
            </View>

        </Container>
    )
}



function mapStateToProps(state) {
    return {
        token: state.auth.token,
    }
}

function mapDispatchToProps() {
    return {
         
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Graphics);
