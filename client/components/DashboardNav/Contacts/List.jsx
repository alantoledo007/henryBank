import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import s from "../../style/styleSheet";
import colors from "../../style/colors";
import IonIcon from "react-native-vector-icons/Ionicons";
import bootnative from 'bootnative';
import Contact from "./Contact";
import { Label } from "../../Quantum";

const bn = bootnative();

export default function List({ contacts, isFetching, token, getContacts, onClose, navigation }) {
   const [modalVisible, setModalVisible] = useState(false);
  const [contactData, setContactData] = useState({
    nickname: "",
    User: {
      name: "",
      surname: "",
      email: ""
    }
  });

  const handleContactPress = (contact) => {
    setContactData(contact);
    setModalVisible(true);
  };
  isFetching && <ActivityIndicator style={{}} />;
  return (
    <ScrollView>
        {contacts && contacts.length ? contacts.map((contact, index) => (
    <View key={index}>
            <TouchableOpacity onPress={() => handleContactPress(contact)}>
              <View style={bn("my-3 row")}>
                  <Image
                  source={{ uri: contact.User.avatar }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 90,
                    marginRight: 20
                  }}
                />
                <View style={{display: "flex", justifyContent: "center", marginTop: -5}}>
                                    <Label style={bn("h4")} text={contact.nickname} />
                                    </View>
                <IonIcon
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 0,
                  }}
                  name="ios-arrow-forward"
                  size={30}
                  color={colors.pink}
                />
              </View>
            </TouchableOpacity>
            {index < contacts.length - 1 && 
              <View style={bn("borderBottom-1-lightgray")} />
            }
              </View>
        )) : 
        <View>
          <Label text="No hay contactos disponibles" style={bn("text-center mt-5")}/>
        </View>
        }
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
          >
          <Contact navigation={navigation} getContacts={getContacts} contact={contactData} token={token} onClose={onClose} close={()=>{setModalVisible(false)}}/>
        </Modal>
          </ScrollView>
    );
}
