import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView
} from "react-native";

import { connect } from "react-redux";


// import RNPickerSelect from "react-native-picker-select";

//Sub-components
import DepositCash from "./DepositCash";
import DepositCard from "./DepositCard";
import { bn, Container, Label } from "../../Quantum";

//UI
import { TabBar, TabView, Tab, Modal, Select, SelectItem, IndexPath, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';

const Deposit = ({ closeModal, navigation }) => {
  const methods = [
    "qr",
    "card"
  ]
  const data = ['Codigo QR', 'Tarjeta'];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem title={title} key={title}/>

  );

  const close = () => {
    if (navigation) {
      return navigation.navigate("Dashboard");
    }
  };

  return (
    <Layout style={{flex:1}}>

<ScrollView>
      <Layout style={{...bn('p-6')}} level="1" >

      <Select
        status="info"
        label="Elija como quiere recargar dinero"
        placeholder='Default'
        selectedIndex={selectedIndex}
        value={displayValue}
        style={bn('mb-6')}
        onSelect={(index) => setSelectedIndex(index)}>
        {data.map(renderOption)}
      </Select>

      {methods[selectedIndex.row] === "qr" && <DepositCash />}
      {methods[selectedIndex.row] === "card" && (
      <DepositCard close={close} navigation={navigation} />
      )}
      </Layout>
    </ScrollView>

    </Layout>

  );
};

const mapStateToProps = (state) => {
  return {
    recharge_code: state.auth.user.recharge_code,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Deposit);
