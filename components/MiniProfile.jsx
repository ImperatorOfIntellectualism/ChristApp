import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const MiniProfile = ({ profile, navigation}) => {
const [user, setUser] = useState(null)
const [image, setImage] = useState(null)

  console.log(profile)

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch ("http://192.168.1.242:3000/getUser", {method: "POST", headers: {Accept: "application/json",
      "Content-Type": "application/json",}, body: JSON.stringify({name: profile})})
      return user.json()
    }
    getUser().then((user)=>{setUser(user)})

    const getImage = async () => {
      const avatar = await fetch("http://192.168.1.242:3000/getImage", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: profile }),
      });
      return avatar.text();
    };
    getImage().then((ava) => {
      setImage(ava);
    });
  }, [])

  if (!!user){
  return (
    <TouchableOpacity onPress={async ()=>{if (await AsyncStorage.getItem("Login") == user.login){navigation.navigate("UserProfile")} else navigation.navigate("Profile", {login: user.login})}}>
    <Container>
      <Avatar source={{ uri: "data:image/jpg;base64," + image }}></Avatar>
      <TweetContainer>
        <NameContainer>
          <FullName>{user.login}</FullName>
          <GrayText>{user.subText}</GrayText>
        </NameContainer>
        <Tweet>{user.description}</Tweet>
      </TweetContainer>
    </Container>
    </TouchableOpacity>
  );
  }
  else return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <Text>Loading...</Text>
</View>)
};

const Avatar = styled.Image`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const FullName = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 1px;
`;

const GrayText = styled.Text`
  font-size: 24px;
  color: #c0c0c0;
  line-height: 30px;
  margin-left: 10px;
`;

const NameContainer = styled.View`
  margin: 0;
  flex-direction: row;
  flex: 1;
`;

const TweetContainer = styled.View`
  margin: 0;
  flex-direction: column;
`;

const Container = styled.View`
  margin: 0;
  padding: 5px;
  background-color: white;
  flex-direction: row;
`;

const Tweet = styled.Text`
  margin: 0;
  padding: 5px;
  background-color: white;
`;

export default MiniProfile;