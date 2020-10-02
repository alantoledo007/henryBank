//general
import React from 'react';
import { StyleSheet, View, Text, Alert, TextInput, Button, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import { useForm, Controller } from "react-hook-form";

//actions
import {setName} from '../redux/actions/user';

function Login({name,setName}){
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="firstName"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.firstName && <Text>This is required.</Text>}

            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                />
                )}
                name="lastName"
                defaultValue=""
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

function mapStateToProps(state) {
    return {
        name: state.user.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setName: () => dispatch(setName())
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'green',
        paddingTop: StatusBar.currentHeight
      },
      button: {
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        alignSelf: 'stretch',
      },
      buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',

      },
      buttonsContainer: {
        flex:2,
        flexDirection: 'row',
      }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);