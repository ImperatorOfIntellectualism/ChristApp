import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Group from "../components/Group";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slice'
import { CommonActions } from '@react-navigation/native';


const LoginScreen = ({ navigation }) => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  console.log(count)

  const [name, setName] = useState(null)
  const [pass, setPass] = useState(null)
    return (
      <Container>
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text)=>{setName(text)}}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text)=>{setPass(text)}}
        />
        <Button onPress={()=>{dispatch(increment())}}/>
        <Button
          title='Sign Up'
          onPress={async ()=>{if(name != null && pass != null) { await fetch("http://192.168.1.242:3000/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: name, password: pass}),
          }).then( async (response) => {
            if (!response.ok) {
                alert("Такого пользователя нет, проверьте данные")
            }
            else {await AsyncStorage.setItem('Login', name)
          }
        });
        navigation.dispatch(CommonActions.goBack());
        dispatch(increment())
        console.log("CUCK")
        } else alert("Введите данные")}}
        />
      </View>
      </Container>
    );
  };

  const Container = styled.View`
  flex: 1;
`;

  const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#42A5F5',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  export default LoginScreen;