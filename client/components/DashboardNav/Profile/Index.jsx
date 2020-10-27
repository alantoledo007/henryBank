import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

//sub-components
import { Container, Input, Button, Label, QTLink } from "../../Quantum";
import ViewProfile from "./ViewProfile";
import Edit from "./Edit";

function Profile({ token, user, navigation }) {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
    createdAt: "",
    phone_number: "",
    address_street: "",
    address_number: "",
    locality: "",
    province: "",
    doc_type: "",
    doc_number: "",
  });
  const [editMode, setEditMode] = useState(false);
  const dataExample = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    avatar: user.avatar,
    createdAt: "2020-10-26",
    phone_number: "1534834999",
    address_street: "Avenida Pueyrredon",
    address_number: 895,
    locality: "Ciudad Autónoma de Buenos Aires",
    province: "Ciudad Autónoma de Buenos Aires",
    doc_type: "dni",
    doc_number: "42011806",
  };

  const submitChanges = form => {
    axios.put('blablabla', {})
  }

  return (
    <Container style={styles.container}>
      {editMode ? (
        <Edit
          data={dataExample}
          token={token}
          exitEditMode={() => setEditMode(false)}
        />
      ) : (
        <ViewProfile data={dataExample} editMode={() => setEditMode(true)} />
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
