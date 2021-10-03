import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Group from "../components/Group";
import { Ionicons } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation }) => {
  const language = navigator.language
  const InnerText = language == "en" ? ["Username", 'Password', 'Repeat the password', 'Sign Up'] : ["Логин", 'Пароль','Повторите пароль',"Зарегистрироваться"];
  const [name, setName] = useState(null)
  const [pass, setPass] = useState(null)
  const [pass2, setPass2] = useState(null)
    return (
      <Container>
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={InnerText[0]}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text)=>{setName(text)}}
        />
        <TextInput
          style={styles.input}
          placeholder={InnerText[1]}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text)=>{setPass(text)}}
        />
        <TextInput
          style={styles.input}
          placeholder={InnerText[2]}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(text)=>{setPass2(text)}}
        />
        <Button
          title={InnerText[3]}
          onPress={()=>{if(pass == pass2) {fetch("http://192.168.1.242:3000/register", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: name, password: pass}),
          });
        navigation.navigate("Home")} else alert("Пароли не совпадают")}}
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

  export default RegistrationScreen;