import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Touchable,
  Alert
} from 'react-native';

import userhandler from '../services/userhandler.js';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


//WebBrowser.maybeCompleteAuthSession();


export default function CadastroGoogle(Component) {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [username, setUsername] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "525544504469-7c7oovtievi6a5d9pksb9p6o4j82t2g8.apps.googleusercontent.com",
    expoClientId: "525544504469-9iefml1kotrlsifshjeof4quhifu9ttq.apps.googleusercontent.com",
  });

  React.useEffect(() => {
  setMessage(JSON.stringify(response));
  if (response?.type === "success") {
    console.log("sucess")
    setAccessToken(response.authentication.accessToken);
  }
}, [response]);

React.useEffect(() => 
  {try{
    getUserData()
  }catch{
    //err
  }})

async function getUserData() {
  let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  userInfoResponse.json().then(data => {
    setUserInfo(data);
  });
}

function showUserInfo() {
  if (userInfo) {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.datalabel} >Nome: {userInfo.name}</Text>
        <Text style={styles.datalabel}>Email: {userInfo.email}</Text>
      </View>
    );
  }
}



return (
  <View style={styles.container}>
    {showUserInfo()}
    <View style={styles.label}>
        <Text style={styles.labelText}>Username</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCorrect={false}
        onChangeText={(username => setUsername(username))}
      />
    <View style={styles.label}>
        <Text style={styles.labelText}>Senha</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={(senha => setSenha(senha))}
        secureTextEntry={true}

      />
    <TouchableOpacity style={styles.btnLogin}
      
      //onPress={accessToken ? getUserData : () => { promptAsync({ showInRecents: true }) }}
      onPress={accessToken ? 
        () => { userInfo ?
          userhandler.post('/novoUsuario', {
            nome: userInfo.name,
            username: username,
            email: userInfo.email,
            senha: senha
          })
            .then(function (response) {
              console.log(response);
              Alert.alert('Cadastro realizado')
            })
            .catch(function (error) {
              console.log(error);
              console.log(userInfo.name, userInfo.email)
              Alert.alert('Dados invalidos')
            }) 
            : Alert.alert('Carregando dados')
        }
        : () => { promptAsync({ showInRecents: true }) }}
    ><Text  style={styles.loginText}>{accessToken ? "Prosseguir" : "Logar"}</Text></TouchableOpacity>
    <StatusBar style="auto" />
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  label: {
    fontSize: 24
  },
  datalabel: {
    fontSize: 18
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25
  },
  labelText: {
    fontSize: 24,
    color: '#000000',
    opacity: 0.5
  },
  
  btn: {
    width: '80%',
    backgroundColor: '#204cfa',
    height: 45,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25
  },
  btnLogin: {
    width: '80%',
    backgroundColor: '#204cfa',
    height: 45,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25
  },
  loginText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15.75,
    lineHeight: 24,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 20, // usar styles components
    color: '#fff'
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: 20
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 70,
    height: 70
  }
});
