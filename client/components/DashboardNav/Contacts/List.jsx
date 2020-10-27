import React, { useState } from "react";
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

import Contact from "./Contact";
import { Label } from "../../Quantum";

export default function List({ contacts, isFetching, token, getContacts }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [contactData, setContactData] = useState({
    nickname: "",
    User: {
      name: "",
      surname: "",
      email: ""
    }
  });
  const urlAvatar = (name,surname) => {
    return 'https://ui-avatars.com/api/?name='+name+'+'+surname+'&background=FFBD69&color=000'
}
  const handleContactPress = (contact) => {
    console.log(contact);
    setContactData(contact);
    setModalVisible(true);
  };

  if (isFetching) return <ActivityIndicator style={{}} />;
  if (contacts) {
    return (
      <>
        {contacts.map((contact, index) => (
          <ScrollView key={index}>
            <TouchableOpacity onPress={() => handleContactPress(contact)}>
              <View style={{ ...s.mb(4), flexDirection: "row" }}>
                <Image
                  source={{ uri: contact.User.avatar ? contact.User.avatar : urlAvatar(contact.User.name, contact.User.surname) }}
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "flex-start",
                    borderRadius: 10,
                  }}
                ></Image>
                <View>
                    <Label text={`${contact.nickname.toLowerCase()}`} />
                  <Text
                    style={{
                      ...s.textColor('black'),
                      ...s.size(2),
                      ...s.ml(1),
                    }}
                  >
                    <IonIcon name="ios-mail" />
                    <Label style={{...s.size(2.5)}}  text={`${contact.User.email}`} />
                  </Text>
                </View>
                <IonIcon
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 0,
                  }}
                  name="ios-arrow-forward"
                  size={30}
                  color={'black'}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: colors.pink,
                borderBottomWidth: 1,
                ...s.mb(5),
              }}
            />
          </ScrollView>
        ))}
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Contact getContacts={getContacts} contact={contactData} token={token} close={()=>setModalVisible(false)}/>
        </Modal>
      </>
    );
  }
}
