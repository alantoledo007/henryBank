import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

//api
import axios from "axios";
import env from "../../../env";

//ui
import colors from "../../style/colors";
//sub-components
import { Container, Input, Button, Label, QTLink } from "../../Quantum";
import ViewProfile from "./ViewProfile";
import Edit from "./Edit";

function Profile({ token, user, navigation }) {
  const [dis, setDis] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    surname: user.surname,
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


  // const submitChanges = form => {
  //   axios.put('blablabla', {})
  // }

  const getUserData = (token) => {
    setDis(true);
    axios
      .get(`${env.API_URI}/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.profile);
        setDis(false);
      })
      // .then(()=>console.log(userData))
      .catch((err) => {
        setDis(false);
        console.log("ERROR AL TRAER INFO DE PERFIL", err);
      });
  };

  useEffect(() => {
    getUserData(token);
  }, []);

  return (
    <Container style={styles.container}>
      <ActivityIndicator animating={dis} size="large" color={colors.pink} />
      {editMode ? (
        <Edit
          data={userData}
          token={token}
          exitEditMode={() => setEditMode(false)}
        />
      ) : (
        <ViewProfile data={userData} editMode={() => setEditMode(true)} />
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
