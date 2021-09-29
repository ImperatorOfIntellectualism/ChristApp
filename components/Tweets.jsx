import React, {useEffect, useState} from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';

const Tweets = ({ text, profile, image, crossBool }) => {
  const cross = "\u274C";
  const [user, setUser] = useState(null)
  const [like, setLike] = useState(false)
  useEffect(()=>{
    const getUser = async () => {
      const userName = await AsyncStorage.getItem("Login");
      if (username != null) {
      const user = await fetch("http://192.168.1.242:3000/getUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      });
      return user.json();
    };
    getUser().then((person) => {
      setUser(person);})
    }
  }, [])

  if(user != null){
    if(like != true){
  if(user.likes.find( x => x.tweetTxt === text.tweetTxt)){setLike(true)}
    }
  }

  return (
    <Container>
      <Avatar source={{ uri: "data:image/jpg;base64," + image }}></Avatar>
      <TweetContainer>
        <NameContainer>
          <FullName>{profile.login}</FullName>
          <GrayText>{profile.subText}</GrayText>
          <GrayText>{text.tweetDate}</GrayText>
        </NameContainer>
        <Tweet>{text.tweetTxt}</Tweet>
        {like && !crossBool && user != null && <TouchableOpacity onPress={()=>{fetch("http://192.168.1.242:3000/dislikeTweet", {method: "POST", headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.login,
                tweet: text,
              }),}); setLike(false)}}><AntDesign style={{paddingLeft: 5}} name="heart" size={16} color="red" /></TouchableOpacity>}{!like && !crossBool && user != null && <TouchableOpacity onPress={()=>{fetch("http://192.168.1.242:3000/likeTweet", {method: "POST", headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.login,
                tweet: text,
              }),}); setLike(true) }}><AntDesign style={{paddingLeft: 5}} name="hearto" size={16} color="black" /></TouchableOpacity>}
      </TweetContainer>
      <View style={{ flex: 1 }}>
        {crossBool &&
        <TouchableOpacity
          onPress={async () => {
            fetch("http://192.168.1.242:3000/deleteTweet", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: profile.login,
                tweet: text,
              }),
            }); 
          }}
        >
          <Text style={{ alignSelf: "flex-end" }}>{cross}</Text>
        </TouchableOpacity>}
      </View>
    </Container>
  );
};

const Avatar = styled.Image`
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const FullName = styled.Text`
padding-left: 5px;
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 1px;
`;

const GrayText = styled.Text`
  font-size: 14px;
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
margin-top: 25px;
  padding: 5px;
  background-color: white;
`;

export default Tweets;
