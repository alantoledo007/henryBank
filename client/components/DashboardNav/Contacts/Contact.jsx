import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import colors from "../../style/colors";
import { bn, Container, Label, DefaultButton } from "../../Quantum";
import { deleteContact } from '../../../redux/actions/contact';

function Contact({ contact, token, close, deleteContact }) {
  const { name, surname, email, avatar } = contact.User;
  const { nickname, id } = contact;


    const navigateToTransfer = () => {
        close();
        // navigation.navigate("Panel");
    }

  const handleDelete = (id) => {
    setDis(true)
    deleteContact(id, token);
    setTimeout(() => {
      setDis(false);
      close();
    }, 1000)
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
        <ActivityIndicator animating={dis} size="large" color={colors.pink} />
        <View>
          <Label text={"Detalles de " + nickname} style={bn("text-center h3")}/>
        </View>
        <View style={{...bn("row mt-5"), justifyContent: "flex-start"}}>
            <Image
              style={{ width: 120, height: 120, ...bn("borderRadius-90 mr-5") }}
              source={{ uri: "https://ui-avatars.com/api/?name=Nacho+Caldumbide&background=FFBD69&color=000" }}
            />
          <View style={{ justifyContent: "center" }}>
              <Label text={name + " " + surname} style={{fontSize: 20, marginBottom: 0}}/>
              <Label text={email} style={{fontSize: 15, marginTop: -3, marginBottom: 10}}/>
              <DefaultButton label="Eliminar Contacto" onPress={() => handleDelete(id)} />
          </View>
        </View>
        <View style={bn("mt-5")}>
          <Label text="Últimas transacciones" style={{fontSize: 25}} />
        </View>
        <View>
          {testLastTransactions && testLastTransactions.length ?
            testLastTransactions.map((transaction, index) => (
              <View key={index}>
                <Label text={transaction.date} style={bn("text-right h6 mt-1")}/>
                <View style={bn("row")}>
                    <Image
                      style={{ ...bn("borderRadius-90 mr-5 mb-5"), width: 80, height: 80 }}
                      source={{ uri: transaction.profilePic }}
                    />
                  <View style={{ justifyContent: "space-evenly" }}>
                    <Label text={transaction.amount < 0 ? "Enviaste $" + Math.abs(transaction.amount.toFixed(2)) : "Recibiste $" + transaction.amount.toFixed(2)} />
                    <Label text={"Descripción: \n" + transaction.description} style={bn("h6 mb-5")} />
                  </View>
                </View>
                {index < testLastTransactions.length - 1 &&
                  <View style={bn("borderBottom-1-lightgray")} />
                }
              </View>
            )) :
            (
              <View>
                <Label text={"No tienes transacciones registradas con " + nickname + "."} style={bn("h6")} />
                </View>
            )}
        </View>
        <DefaultButton label="Enviar dinero" onPress={navigateToTransfer} style={bn("mt-5")}/>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteContact: (id, token) => dispatch(deleteContact(id, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
