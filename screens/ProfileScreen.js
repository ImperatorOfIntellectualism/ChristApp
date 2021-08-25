import React, {useState} from "react";
import { ScrollView, Text} from "react-native";
import styled from "styled-components/native";
import Tweets from "../components/Tweets";
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//TODO: Add description to a Group, add date of registration

const ProfileScreen = ({navigation}) => {

  const Profile = navigation.getParam("item")

  const Container = styled.View`
background-image: url(${Profile.uri});
background-size: cover;
  flex: 1;
  padding-top: 60px;
`;

  const [tweet, setTweet] = useState(1)
    return(
        <Container>
          <SubContainer>
          <Avatar source={{uri: Profile.uri}}></Avatar>
      <FullName>{Profile.fullName}</FullName>
      <GrayText>{Profile.subText}</GrayText>
      <Description>I suck dicks regularly</Description>
      <GrayText style={{marginTop: 15}}><FontAwesome5 name="calendar-alt" size={14} color="black" /> Joined</GrayText>
      <ButtonContainer>
        <Button onPress={() => {}}><Text style={{color: "white"}}>BAKA</Text></Button>
        <CallButton><Feather name="phone-call" size={24} color="white" /></CallButton>
        </ButtonContainer>
        </SubContainer>
        <Tab>
          <Tabutton style={{borderBottomColor: (tweet == 1) ? "#43a8f0" : "#000000", borderBottomWidth: (tweet == 1) ? 2 : 0}} onPress={() => {setTweet(1)}}>
            <Text style={{color: (tweet == 1) ? "#43a8f0" : "#000000"}}>
              KEKWAIT
              </Text>
              </Tabutton>
              <Tabutton style={{borderBottomColor: (tweet == 2) ? "#43a8f0" : "#000000", borderBottomWidth: (tweet == 2) ? 2 : 0}} onPress={() => {setTweet(2)}}>
                <Text style={{color: (tweet == 2) ? "#43a8f0" : "#000000"}}>
                  SUKAAA
                  </Text>
                  </Tabutton>
                  </Tab>
        <Tweets profile={Profile} text={tweet}></Tweets>
    </Container>
    )
}

const ButtonContainer = styled.View`
padding: 12px;
flex-direction: row;
`;

const Tab = styled.View`
flex-direction: row;

  background-color: #f1f1f1;
`;

const Tabutton = styled.TouchableOpacity`
background-color: inherit;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  borderRightWidth: 2;
  borderRightColor: "#000000"
`;

const Avatar = styled.Image`
  top: -25;
  position: absolute;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  border: solid 2px #FFFFFF;
`;

const FullName = styled.Text`
font-weight: 800;
font-size: 24px;
line-height: 30px;
margin-bottom: 1px;
margin-top: 10px;
`;

const CallButton = styled.TouchableOpacity`
justify-content: center;
align-items: center;
border-radius: 50px;
background: #42f569;
height: 45px;
width: 45px;
margin-left: 5px;
margin-top: 5px;
`;

const Description = styled.Text`
  margin-top: 10px;

`;

const Button = styled.TouchableOpacity`
justify-content: center;
align-items: center;
border-radius: 30px;
background: #2a86ff;
height: 45px;
margin-top: 5px;
flex: 1;
`;

const GrayText = styled.Text`
  font-size: 14px;
  color: #C0C0C0;
`;

const SubContainer = styled.View`
  margin-top: 40px;
  background: #FFFFFF;
  padding: 25px;
  padding-bottom: 0px;
`;

const PlusButton = styled.TouchableOpacity`
position: absolute;
bottom: 5%;
right: 5%;
align-items: center;
justify-content: center;
border-radius: 50px;
width: 64px;
height:64px;
background: #2A86FF;
`;

ProfileScreen.navigationOptions = {title: "Home",
headerTintColor: "#0000FF",
headerStyle: {
  elevation: 0.8,
  shadowOpacity: 0.8,
},
}

export default ProfileScreen;