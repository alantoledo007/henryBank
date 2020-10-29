import React from 'react';
import { View, Text, Clipboard, TouchableOpacity, useColorScheme } from 'react-native';
import { connect } from 'react-redux';
import { Container, Label, Button } from '../Quantum';
import { Card } from 'react-native-elements';
import s from '../style/styleSheet';
import { useState } from 'react';
import IconsMCI2 from 'react-native-vector-icons/Ionicons';

const Cuentas = (props) => {

    const theme = useColorScheme();

    const { usd, arg } = props;

    const [copiedText, setCopiedText] = useState('')
    const copyToClipboard = () => {
        Clipboard.setString(`${arg.cvu}`)
    }

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(text)
    }

    const format = (amount) => {
        return Number(amount)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      };

    return (
        <Container>
            <Card >
                <Card.Title>Cuenta ARS</Card.Title>
                <Card.Divider />
                <Label text='Balance'/>
                <Label text={`$${format(arg.balance)}`} />
                <Label text='Cvu' />
                <Label text={arg.cvu}/>    
            </Card>
            <Card>
                <Card.Title>Cuenta USD</Card.Title>
                <Card.Divider/>
                <Label text='Balance'/>
                <Label text={`U$${format(usd.balance)}`}/>    
                <Label text='Cvu' />
                <Label text={usd.cvu}/>
                <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCopiedText()}>
          <Text>View copied text</Text>
        </TouchableOpacity>  
        <View> 
        <IconsMCI2
                                        name='clipboard'
                                        color={theme === 'dark' ? '#fff' : '#000'}
                                     
                                    />
 </View>         
  </Card>

        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        
        usd: state.auth.user.accounts[0],
        arg: state.auth.user.accounts[1]

    }
}

export default connect (mapStateToProps)(Cuentas);