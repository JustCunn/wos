import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [colour1, setColour1] = useState("black");
  const [colour2, setColour2] = useState("black");

  const signupFn = () => {
        auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
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

    database().ref('/users/' + username).update({email: email,}).then(() => console.log('Data updated.'));
  }

  const loginFn = () => {
    auth().signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error))
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
            <TextInput autoCapitalize='none' style={[styles.textInput, {borderColor: colour1}]} onFocus={onFocus1}
            onBlur={onBlur1} placeholder="Email address" onChangeText={setEmail} value={email}/>
            <TextInput autoCapitalize='none' style={[styles.textInput, {borderColor: colour1}]} onFocus={onFocus1}
            onBlur={onBlur1} placeholder="Username" onChangeText={setUsername} value={username}/>
            <TextInput autoCapitalize='none' style={[styles.textInput, {borderColor: colour2}]} onFocus={onFocus2}
            onBlur={onBlur2} placeholder="Password" secureTextEntry={true} onChangeText={setPassword} value={password}/>
            <TouchableOpacity style={styles.button} title="signup" onPress={signupFn}><Text style={styles.text}>Sign Up Page</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="login" onPress={loginFn}><Text style={styles.text}>Login Page</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textInput: {
      margin: 10,
      borderWidth: 1,
      borderRadius: 7,
    },
    button: {
      margin: 10,
      backgroundColor: '#e3393c',
      height: 45,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
    },
    text: {
      color: 'white',
    }
})