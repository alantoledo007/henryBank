import React, { useState, useEffect } from "react";
import moment from 'moment';
import {
  View,
  Image,
  ActivityIndicator,
  Modal
} from "react-native";
import { connect } from "react-redux";
import IonIcon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../style/colors";
import { bn, Scroll, Label, DefaultButton, NoScrollContainer, Input } from "../../Quantum";
import { deleteContact, updateContact, getContactTransactions } from '../../../redux/actions/contact';

function Contact({ contact, token, close, onClose, deleteContact, updateContact, getContactTransactions, transactions }) {
  const { name, surname, email, avatar } = contact.User;
  const { nickname, id } = contact;

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [updateValue, setUpdateValue] = useState("");

  const navigateToTransfer = () => {
    close();
    // navigation.navigate("Panel");
  }

  const handleDelete = () => {
    setDis(true);
    deleteContact(id, token);
    onClose();
    setTimeout(() => {
      setDis(false);
      close();
    }, 1000)
  };

  const handleUpdate = () => {
    let data = {
      id,
      nickname: updateValue
    }
    setDis(true);
    updateContact(data, token);
    onClose();
    setTimeout(() => {
      setDis(false);
      close();
    }, 1000)
  }

  useEffect(() => {
    const contactId = id;
    getContactTransactions(contactId, token);
  }, [])

  const [dis, setDis] = useState(false);
  // const { id } = useParams();

  return (
    <>
      <NoScrollContainer>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 80, height: 80, ...bn("borderRadius-90") }}
            source={{ uri: avatar }}
          />
          <Label text={"Detalles de " + nickname} style={bn("h3")} />
        </View>
        <View style={{ ...bn("row mt-3"), justifyContent: "space-between" }}>
          <View>
            <Label text={name + " " + surname} style={{ fontSize: 20, marginBottom: 0 }} />
            <Label text={email} style={{ fontSize: 15, marginTop: -3 }} />
          </View>
          <View>
            <View style={bn("row")}>
              <IonIcon
                style={bn("mr-2 bg-#FBC230 p-2 borderRadius-90")}
                name="account-edit"
                size={25}
                color="white"
                onPress={() => setModal(true)}
              />
              <IonIcon
                style={bn("bg-#DD4145 p-2 borderRadius-90")}
                name="account-remove"
                size={25}
                color="white"
                onPress={() => setModalDelete(true)}
              />
            </View>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
              setModal(false)
            }}
          >
            <NoScrollContainer style={{ justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", height: "100%" }}>
              <View style={bn("bg-white p-5 pt-7")}>
                <IonIcon
                  style={{ ...bn("p-2 borderRadius-90 text-right"), position: "absolute", top: 0, right: 0 }}
                  name="close-circle"
                  size={25}
                  color="#DD4145"
                  onPress={() => setModal(false)}
                />
                <Label text={"Elegí un nuevo nombre para " + nickname} style={bn("text-center h5")}></Label>
                <Input onChangeText={(value) => setUpdateValue(value)} value={updateValue} />
                <DefaultButton label={dis ? <ActivityIndicator animating={dis} size="small" color="white" /> : "Editar contacto"} onPress={() => handleUpdate()} style={bn("mt-3")} />
              </View>
            </NoScrollContainer>
          </Modal>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalDelete}
            onRequestClose={() => {
              setModalDelete(false)
            }}
          >
            <NoScrollContainer style={{ justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", height: "100%" }}>
              <View style={bn("bg-white p-5 pt-7")}>
                <IonIcon
                  style={{ ...bn("p-2 borderRadius-90 text-right"), position: "absolute", top: 0, right: 0 }}
                  name="close-circle"
                  size={25}
                  color="#DD4145"
                  onPress={() => setModalDelete(false)}
                />
                <Label text={"¿Estás seguro de que querés eliminar a " + nickname + "?"} style={bn("text-center h5")}></Label>
                <DefaultButton label={dis ? <ActivityIndicator animating={dis} size="small" color="white" /> : "Eliminar contacto"} onPress={() => handleDelete()} style={bn("mt-3")} />
              </View>
            </NoScrollContainer>
          </Modal>
        </View>
        <View>
          <DefaultButton label="Enviar dinero" onPress={navigateToTransfer} style={bn("mt-3")} />

        </View>
        <View style={bn("mt-3")}>
          <Label text="Últimas transacciones" style={{ fontSize: 25 }} />
        </View>
      </NoScrollContainer>
      <Scroll>
        <View>
          {transactions && transactions.length ?
            transactions.map((transaction, index) => (              
              <View key={index} style={{ ...bn("row mb-3") }}>
                <View style={{ ...bn("row"), width: "70%" }}>
                  <IonIcon
                    style={bn("mr-3 borderRadius-90")}
                    name={transaction.amount < 0 ? "bank-transfer-out" : "bank-transfer-in"}
                    size={35}
                    color={transaction.amount < 0 ? "red" : "green"}
                  />
                  <View style={{ justifyContent: "space-evenly" }}>
                    <Label text={transaction.amount < 0 ? "Enviaste $" + Math.abs(transaction.amount.toFixed(2)) : "Recibiste $" + transaction.amount.toFixed(2)} />
                    <Label text={"Descripción: \n" + transaction.description} style={bn("h6")} />
                  </View>
                </View>
                <View style={{ width: "30%", alignItems: "flex-end" }}>
                  <Label text={moment(transaction.createdAt).format("dd/MM/YYYY")} style={bn("h6")} />
                </View>
                {index < transactions.length - 1 &&
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
      </Scroll>
    </>
  );
}

function mapStateToProps(state) {
  return {
  transactions: state.contacts.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteContact: (id, token) => dispatch(deleteContact(id, token)),
    updateContact: (data, token) => dispatch(updateContact(data, token)),
    getContactTransactions: (contactId, token) => dispatch(getContactTransactions(contactId, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
