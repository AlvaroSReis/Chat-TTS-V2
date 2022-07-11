import React, { Component, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Button,
  Alert
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import userhandler from '../services/userhandler.js';
function apiGetData(username, senha) {
  return userhandler.get(`/login/${username}&${senha}`)
}



export default function Login( Component) {

  const [username, setUsername] = useState('');
  var dados_recebidos;
  var dados_mapeados;
  var value;
  var resp;

  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();


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
  })
  userInfoResponse.json().then(data => {
    setUserInfo(data);
  });
}

async function getUsername() {
  let usernameQuery = await userhandler.get('/username/' + userInfo.email)
    usernameQuery.json().then(data => {
    setUsername(data.username);
  });
}


  return (
    <View style= {styles.container}>
      <TouchableOpacity style={styles.btnLogin}
      onPress={accessToken ? 
        () => {
          console.log('Handling promises')
          try {
              Promise.all(getUserData().then( 
              userhandler.get('/username/' + userInfo.email)).then(
              AsyncStorage.setItem('USERNAME', username),
              AsyncStorage.setItem('NAME', userInfo.name),
              AsyncStorage.setItem('EMAIL', userInfo.email)).then(
              navigation.navigate('Home')))
          }catch(e) {
             console.log('e')
             Alert.alert('Aguarde')
          }
            
         } : () => { promptAsync({ showInRecents: true }) }}
    ><Text  style={styles.loginText}>{accessToken ? "Prosseguir" : "Logar"}</Text></TouchableOpacity>
    <StatusBar style="auto" />
    </View>
  )

  /*
  async function storeUsername() {
    try {
      await AsyncStorage.setItem('USERNAME', username)
    } catch (e) {
      console.log('error')
      // saving error
    }
  }

  const navigation = useNavigation();
*/
  /*
  return (
    <View style={styles.container}>
          <View>
            <Text style={styles.label}>Usuário</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Usuário'
            autoCorrect={false}
            onChangeText={(username => setUsername(username))}
          />
          <View>
            <Text style={styles.label}>Senha</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Senha'
            autoCorrect={false}
            onChangeText={(senha => setSenha(senha))}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() =>  {

              dados_recebidos = apiGetData(username, senha),
              dados_recebidos.then(function(resposta){
                dados_mapeados = (resposta.data.map(function(){return{
                  username, senha
                };})
                )
                try {
                  
                  value = dados_mapeados[0].username == username && dados_mapeados[0].senha == senha;
                }catch {
                  value = false
                }
      
                if(value == true){
                  //localStorage.setItem('username', dados_mapeados[0].username);
                  storeUsername();
                  navigation.navigate('Home');
                }else{
                  Alert.alert('Dados invalidos')
                }
      
              }).catch(function(error){
                if(error){
                  Alert.alert('Falha no Login')
                  //console.log(error)
                }
              })
              }}
            //onPress={() => navigation.navigate('Home')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() = }
            onPress={() => navigation.navigate('Cadastro')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Cadastro</Text>
          </TouchableOpacity>
        </View>
  )
  */
    
  }

  
/*

          <TouchableOpacity
            //onPress={() = }
            onPress={() => navigation.navigate('Home',{ screen: 'Profile'})}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Login com Google</Text>
          </TouchableOpacity>

  export default class Login extends Component {
    render() {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Usuário</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Usuário'
            autoCorrect={false}
          />
          <View>
            <Text style={styles.label}>Senha</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Senha'
            autoCorrect={false}
          />
          <TouchableOpacity
            //onPress={() = }
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() = }
            onPress={() => this.props.navigation.navigate('Cadastro')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() = }
            //onPress={() => this.props.navigation.navigate('Chat')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt} >Login com Google</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  
 */

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
    input: {
      width: '90%',
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#1010a0',
      fontSize: 17,
      marginTop: 10,
      marginBottom: 30,
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
      bottom: 0
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
    }
  });


  /*
/*onPress={() => { promptAsync({ showInRecents: true })
      .then( async () => await getUserData(),
      console.log('user data got'))
      .then( async (resp) => await 
       userhandler.get('/username/' + userInfo.email),
       console.log('query point'))
      .then(
        console.log('store point'),
        async () => {
          try {
            var value = await AsyncStorage.getItem('USERNAME')
            if(value !== null) {
              console.log(value)
              // value previously stored
            }
          } catch(e) {
            console.log(e)
            // error reading value
          }
        },
        async () => {
          try {
            var value2 = await AsyncStorage.getItem('NAME')
            if(value2 !== null) {
              console.log(value2)
              // value previously stored
            }
          } catch(e) {
            console.log(e)
            // error reading value
          }
        },
        async () => {
          try {
            var value3 = await AsyncStorage.getItem('EMAIL')
            if(value3 !== null) {
              console.log(value3)
              console.log(e)
              // value previously stored
            }
          } catch(e) {
            // error reading value
          }
        },
        //navigation.navigate('Home')
        )}}*/
  