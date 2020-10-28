import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

//redux
import { connect } from "react-redux";
import { updateUserInfo } from '../../../redux/actions/auth';

//api
import axios from "axios";
import env from "../../../env";

//ui
import colors from "../../style/colors";
import Toast from "react-native-toast-message";

//sub-components
import {
  Container,
  toastConfig,
} from "../../Quantum";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

function Profile({ token, user, navigation, updateUserInfo }) {
  const [dis, setDis] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    surname: user.surname,
    email: "",
    avatar: null,
    createdAt: "",
    phone_number: "",
    address_street: "",
    address_number: "",
    locality: "",
    province: "",
    doc_type: "",
    doc_number: "",
  });

  //esta función se va a ejecutar luego de que el usuario elija una imagen de su galería
  const updateAvatar = (base64) => {
    setDis(true);
    //La subimos a imgur
    return axios
      .post(
        "https://api.imgur.com/3/image",
        { image: base64, type: "base64" },
        {
          headers: {
            //Este client-id se podría modificar para que esté en env, si quieren
            Authorization: `Client-ID f397c1f7f39e224`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data.data.link);
        const data = {
          avatar: response.data.data.link,
        };
        //Mandamos el link de imgur resultante a nuestro servidor
        return axios
          .put(`${env.API_URI}/me/updateAvatar`, JSON.stringify(data), {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // console.log(response.data);
            //Recibimos como respuesta el perfil actualizado y lo mandamos a nuestro estado para mostrar la nueva imagen
            setUserData(response.data.profile);
            //También mandamos el nuevo avatar al state de redux, para que se actualice en toda la app.
            updateUserInfo({
              avatar: response.data.profile.avatar
            });
            setDis(false);
          });
      })
      .catch((err) => {
        setDis(false);
        console.log("ERROR AL ACTUALIZAR AVATAR", err);
      });
  };

  const onSubmit = (data) => {
    axios
      .put(`${env.API_URI}/me/update`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        // console.log("FUNCIONO", response.data.userUpdated);
        setUserData(response.data.userUpdated);
      })
      .then(() => {
        setDis(false);
        setEditMode(false);
        Toast.show({
          type: "success",
          text1: "Has actualizado tu domicilio/número de teléfono.",
        });
      })
      .catch((err) => {
        console.log("ERROR AL MODIFICAR DATOS DE PERFIL", err);
        setDis(false);
        Toast.show({
          type: "error",
          text1: "Uno o más datos ingresados no son válidos.",
          text2: "Por favor, revisa los datos y vuelve a intentarlo.",
        });
      });
  };

  const getProfile = () => {
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
        Toast.show({
          type: "error",
          text1: "Hubo un error al traer tus datos de nuestro servidor...",
          text2: "Por favor inténtalo nuevamente.",
        });
        console.log("ERROR AL TRAER INFO DE PERFIL", err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  if (dis)
    return (
      <ActivityIndicator
        style={{ marginTop: 150 }}
        animating={dis}
        size="large"
        color={colors.pink}
      />
    );
  return (
    <Container style={styles.container}>
      {editMode ? (
        <EditProfile
          data={userData}
          exitEditMode={() => setEditMode(false)}
          onSubmit={onSubmit}
        />
      ) : (
        <ViewProfile
          data={userData}
          editMode={() => setEditMode(true)}
          updateAvatar={updateAvatar}
          navigation={navigation}
        />
      )}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
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
  return {
    updateUserInfo: data => dispatch(updateUserInfo(data))
  };
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
