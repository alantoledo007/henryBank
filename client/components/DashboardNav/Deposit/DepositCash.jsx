import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { connect } from "react-redux";

// import QRCode from "qrcode.react";
import QRCode from "react-qr-code";

import { styles as s } from "../../style/styleSheet";
import colors from "../../style/colors";

import { Container, Label, QTLink, bn, defaultColors } from "../../Quantum";
import { TabBar, TabView, Tab, Modal, Select, SelectItem, IndexPath, Input, Card, Icon, Layout, Text, Button } from '@ui-kitten/components';


const DepositCash = ({ recharge_code }) => {
  return (
    <View style={bn('mt-auto mb-auto')}>

        <View style={bn('mt-auto mb-auto')}>
          <QRCode
            size={Dimensions.get('window').width - 60}
            value={JSON.stringify({
              recharge_code,
            })}
          />
          <Text style={bn('text-center p-4')} category="h2">{recharge_code}</Text>
        </View>

      <View style={bn('row mt-5 mb-2')}>
          <View style={bn('col-12')}>
            <Text appearance='hint' style={bn('text-center')}>
              Dirigete a una sucursal de RapiPago o Pago facil, presentale tu código QR al
              cajero y dile cuanto quiere cargar.
            </Text>
          </View>
      </View>

    </View>
  );
};


const mapStateToProps = (state) => {
  return {
    recharge_code: state.auth.user.recharge_code,
  };
};

export default connect(mapStateToProps)(DepositCash);
