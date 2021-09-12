import React, {useState} from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Tweets = ({ text, profile, image }) => {
  const cross = "\u274C";

  return (
    <Container>
      <Avatar source={{ uri: "data:image/jpg;base64," + image }}></Avatar>
      <TweetContainer>
        <NameContainer>
          <FullName>{profile.login}</FullName>
          <GrayText>{profile.subText}</GrayText>
        </NameContainer>
        <Tweet>{text}</Tweet>
      </TweetContainer>
      <View style={{ flex: 1 }}>
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
        </TouchableOpacity>
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

export default Tweets;
