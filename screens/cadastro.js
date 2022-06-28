import * as React from 'react';
import { Component, FC, useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity, TextInput  } from 'react-native';
import userhandler from '../services/userhandler.js';
//handlers
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


//WebBrowser.maybeCompleteAuthSession();




export default function Cadastro(Component) {
  //variables
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  //navigation
  const navigation = useNavigation();
  //google api
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  //placeholders
  const [nomePlaceholder, setNomePlaceholder] = React.useState('Nome Completo');
  const [emailPLaceholder, setemailPLaceholder] = React.useState('Email');
  //client id
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

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
      console.log(data)
      console.log(accessToken)
      setNome(userInfo.name)
      setEmail(userInfo.email)
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.TopText}>Cadastro</Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Nome</Text>
      </View>
      <TextInput
        style={styles.input}
        
        placeholder={nomePlaceholder}
        autoCorrect={false}
        onChangeText={(Nome => setNome(Nome))}
      />
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
        <Text style={styles.labelText}>Email</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder= {emailPLaceholder}
        autoCorrect={false}
        keyboardType='email-address'
        onChangeText={(email => setEmail(email))}
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
        onPress={() => {
          userhandler.post('/novoUsuario', {
            nome: nome,
            username: username,
            email: email,
            senha: senha
          })
            .then(function (response) {
              console.log(response);
              Alert.alert('Cadastro realizado')
            })
            .catch(function (error) {
              console.log(error);
              Alert.alert('Dados invalidos')
            });

        }

        } >

        <Text style={styles.loginText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin}
      onPress = {() => { try {
        promptAsync({ showInRecents: true}).then(
        getUserData(),
      )
      } catch {
        console.log('error')
      }
    }}
      >
        


        <Text style={styles.loginText2}>Cadastrar com google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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

  label: {
    width: '90%',
    paddingLeft: 25,
    marginBottom: -10
  },

  labelText: {
    fontSize: 24,
    color: '#000000',
    opacity: 0.5
  },
  TopText: {
    fontSize: 50,
    color: '#000000',
    opacity: 0.5,
    alignItems: 'center'
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
  loginText2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15.75,
    lineHeight: 24,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 5, // usar styles components
    color: '#fff'
  },
});