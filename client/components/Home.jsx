//general
import React from 'react';
import { View, Text, Button} from 'react-native';
import { connect } from 'react-redux';

//actions
import {setName} from '../redux/actions/user';

function Home({name,setName}){
    return (
        <View>
            <Text>{name}</Text>
            <Button title="Title" onPress={setName} accessibilityLabel="ss" />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);