import React from 'react';
import { Clipboard, useColorScheme } from 'react-native';
import { connect } from 'react-redux';
import { Container, Label, hbn} from '../Quantum';
import { Card } from 'react-native-elements';
import s from '../style/styleSheet';
import { useState } from 'react';
import { Icon } from 'react-native-elements'

const Cuentas = (props) => {

    const theme = useColorScheme();

    const { usd, arg } = props;
    
   const [copiedText, setCopiedText] = useState('')
    const copyToClipboard = () => {
        Clipboard.setString(`${arg.cvu}`)
    }
    const copyToClipboard2 = () => {
        Clipboard.setString(`${usd.cvu}`)
    }

    const format = (amount) => {
        return Number(amount)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      };

    return (
        <Container wihtHeader={true}>
            <Card containerStyle={hbn('borderRadius-6 borderColor-accounts',theme)}>
            <Label text='Cuenta ARS' style={hbn('text-label text-center mb-2',theme)} />
                <Card.Divider style={{borderColor:'#E94560', borderWidth:0.6}}/>
                <Label text='Balance :' style={{...s.size(3)}}/>
                <Label text={`$${format(arg.balance)}`} />
                <Label text='CVU :' style={{...s.size(3)}}/>
                <Label text={arg.cvu}/>    
                <Icon
                    raised
                    name='content-copy'
                    type='MaterialCommunityIcons'
                    onPress={() => copyToClipboard()} 
                    containerStyle={{alignSelf:'center'}}/>
            </Card>
            <Card containerStyle={hbn('borderRadius-6 borderColor-accounts',theme)}>
                <Label text='Cuenta USD' style={hbn('text-label text-center mb-2',theme)} />
                <Card.Divider  style={{borderColor:'#E94560', borderWidth:0.6}}/>
                <Label text='Balance :' style={{...s.size(3)}} />
                <Label text={`U$${format(usd.balance)}`}/>    
                <Label text='CVU :' style={{...s.size(3)}} />
                <Label text={usd.cvu}/>       
                <Icon
                    raised
                    name='content-copy'
                    type='MaterialCommunityIcons'
                    onPress={() => copyToClipboard2()} 
                    containerStyle={{alignSelf:'center'}}/>
                    
                
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