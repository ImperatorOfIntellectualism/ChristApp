import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native'

const Tweets = ({text, profile}) => {
return(
    <Container>
    <Avatar src={{uri: profile.uri}}></Avatar>
    <TweetContainer>
    <NameContainer>
    <FullName>{profile.login}</FullName>
    <GrayText>{profile.subText}</GrayText>
    </NameContainer>
    <Tweet>{text}</Tweet>
    </TweetContainer>
    </Container>
)
}

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
  color: #C0C0C0;
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
padding: 10px;
`;

const Tweet = styled.Text`
margin: 0;
padding: 5px;
background-color: white;
`;

export default Tweets;