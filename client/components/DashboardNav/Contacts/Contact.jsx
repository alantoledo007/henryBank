import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useParams } from "react-router-native";

import colors from "../../style/colors";
import s from "../../style/styleSheet";
import { Container, Label, Button } from "../../Quantum";
import axios from "axios";
import env from "../../../env";

function Contact({ contact, token, close, getContacts }) {
  const { name, surname, email, avatar } = contact.User;
  const { nickname, id } = contact;

    const navigateToTransfer = () => {
        close();
        // navigation.navigate("Panel");
    }

  const deleteContact = (contact_id) => {
    axios.delete(`${env.API_URI}/contacts/${contact_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(()=>{
        getContacts(token);
        close();
    })
    .catch(err=>console.log(err));
  };

  const testLastTransactions = [
    {
      date: "14/08/20",
      profilePic:
        "https://media.istockphoto.com/photos/smiling-man-picture-id580109640?k=6&m=580109640&s=612x612&w=0&h=5pUh9Mano2tmYyrUoU6Nyz0RqUm3P45Os_KK9JkttIM=",
      description: "Pago de deuda (cuota 01/03)",
      amount: 763.47,
    },
    {
      date: "06/03/20",
      profilePic:
        "https://elpersonalista.com/wp-content/uploads/2020/03/papada-hombre-perfil-barba.jpg",
      description: "Pago por servicio de Hosting",
      amount: -1500.0,
    },
  ];
  const [dis, setDis] = useState(false);
  // const { id } = useParams();

  return (
    <Container>
      <ScrollView
        style={{
          position: "relative",
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          display: "flex",
        }}
      >
        <ActivityIndicator animating={dis} size="large" color={colors.pink} />
        <View>
          <Text
            style={{
              ...s.textCenter,
              ...s.textWhite,
              ...s.size(6),
              ...s.mb(3),
            }}
          >
            Detalles de {nickname}
          </Text>
        </View>
        <View style={{ ...s.row, ...s.mt(5), justifyContent: "flex-start" }}>
          <View style={s.mr(5)}>
            <Image
              style={{ width: 120, height: 120, borderRadius: 90 }}
              source={{ uri: avatar }}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <View style={s.mb(2)}>
              <Text style={{ ...s.textWhite, ...s.size(5), ...s.mt(-1.5) }}>
                {name} {surname}
              </Text>
              <Text
                style={{
                  ...s.textWhite,
                  ...s.size(3.5),
                  ...s.mt(-1),
                  ...s.mb(1),
                }}
              >
                {email}
              </Text>
            </View>
            <TouchableOpacity
              style={{ ...s.btn(), paddingTop: 7, paddingBottom: 7 }}
              onPress={() => deleteContact(id)}
            >
              <Text style={{ ...s.textWhite, ...s.size(4) }}>
                Eliminar contacto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{ ...s.textWhite, ...s.size(5), ...s.mt(5), ...s.mb(2) }}
          >
            Últimas transacciones
          </Text>
          <View style={s.hr("pink")} />
        </View>
        <View>
          {testLastTransactions &&
            testLastTransactions.map((transaction) => (
              <>
                <Text
                  style={{ ...s.textWhite, textAlign: "right", ...s.mt(1) }}
                >
                  {transaction.date}
                </Text>
                <View style={{ ...s.row, ...s.hr("pink") }}>
                  <View style={{ ...s.mr(5), ...s.mb(5) }}>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 90 }}
                      source={{ uri: transaction.profilePic }}
                    />
                  </View>
                  <View style={{ justifyContent: "space-evenly" }}>
                    <Text style={{ ...s.textWhite, ...s.size(3.5) }}>
                      {transaction.amount < 0
                        ? "Enviaste $" + Math.abs(transaction.amount)
                        : "Recibiste $" + transaction.amount}
                    </Text>
                    <Text style={{ ...s.textWhite, ...s.mb(5) }}>
                      Descripción: {"\n" + transaction.description}
                    </Text>
                  </View>
                </View>
              </>
            ))}
        </View>
        <TouchableOpacity style={{ ...s.btn(), ...s.mt(5) }} onPress={navigateToTransfer}>
          <Text style={{ ...s.textWhite, ...s.size(4) }}>Enviar dinero</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    register: (data) => dispatch(register(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
