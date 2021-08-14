import React, { useState, } from 'react';
import { View, Switch, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import database, { firebase } from '@react-native-firebase/database';
import Jacob from '../assets/jacob.png';

export default function Login() {

  const dataBase = firebase.app().database('https://watchout-safety-default-rtdb.europe-west1.firebasedatabase.app/');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("")

  const [colour1, setColour1] = useState("black");
  const [colour2, setColour2] = useState("black");
  const [error, setError] = useState(false);

  const [register, setRegister] = useState(false)

  const signupFn = async () => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            const userId = auth().currentUser.uid;
            dataBase.ref('/users/' + userId).update({email: email, name: name}).then(() => console.log('Data updated.'));
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
  }

  const loginFn = () => {
    auth().signInWithEmailAndPassword(email, password)
      .catch(error => setError(true))
  }

  const onFocus1 = () => {
    setColour1("green");
  }

  const onBlur1 = () => {
    setColour1("black");
  }

  const onFocus2 = () => {
    setColour2("green");
  }

  const onBlur2 = () => {
    setColour2("black");
  }

    return (
        <View style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <Image style={{height:100, width:100}} source={Jacob} />
          </View>
            {register && (
            <>
            <Text style={{marginLeft: 10}}>Full Name</Text>
            <TextInput autoCapitalize='none' style={[styles.textInput,]} placeholder="Full Name" onChangeText={setName} value={name}/>
            </>
              )}

            <Text style={{marginLeft: 10}}>Email Address</Text>
            <TextInput autoCapitalize='none' style={[styles.textInput, {borderColor: colour1}]} onFocus={onFocus1}
            onBlur={onBlur1} placeholder="Email address" onChangeText={setEmail} value={email}/>
            {/*register && <TextInput autoCapitalize='none' style={[styles.textInput,]}
              placeholder="Username" onChangeText={setUsername} value={username}/>*/}
            
            <Text style={{marginLeft: 10}}>Password</Text>
            <TextInput autoCapitalize='none' style={[styles.textInput, {borderColor: colour2}]} onFocus={onFocus2}
            onBlur={onBlur2} placeholder="Password" secureTextEntry={true} onChangeText={setPassword} value={password}/>
            {error ? <Text>Your Email or Password is incorrect</Text> : null}
            <TouchableOpacity style={styles.button} title="login" onPress={register ? signupFn : loginFn}>
              <Text style={styles.text}>{register ? 'Sign Up' : 'Log In'}</Text>
              </TouchableOpacity>
            <View style={styles.registerContainer}>
              <View style={{flex: 1,}}><Text style={{fontWeight: 'bold', fontSize: 18}}>Register</Text></View>
              <View style={{flex:1,}}>
                <Switch
                  trackColor={{ false: "#767577", true: '#4788c6' }}
                  thumbColor={register ? "#b5dcfd" : "#f4f3f4"}
                  onValueChange={() => setRegister(!register)}
                  value={register}/>
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    imageWrapper: {
      alignItems: 'center',
      width: '100%'
    },
    textInput: {
      margin: 10,
      padding: 10,
      height: 40,
      color: 'black',
      backgroundColor: '#fafafa',
      borderBottomWidth: 0.8,
    },
    button: {
      margin: 10,
      backgroundColor: '#4788c6',
      height: 45,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
    },
    text: {
      color: 'white',
    },
    registerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10
    }
})