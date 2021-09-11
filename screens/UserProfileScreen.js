import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View, Platform, Image, RefreshControl, TextInput, Button, ImageBackground } from "react-native";
import styled from "styled-components/native";
import Tweets from "../components/Tweets";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";

//TODO: Add description to a Group, add date of registration


const UserProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisibility] = useState(false)

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [image, setImage] = useState(null)
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  useEffect( async () => {
    

    const getUser = async () => {
      const userName = await AsyncStorage.getItem("Login");
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
    getUser().then((person) => {setUser(person);
      
      const getImage = async () => {
        const image = await fetch("http://192.168.1.242:3000/getImage", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: person.login }),
          });
          return image.text();
        }
        getImage().then((image) => {setImage(image)});

    });
  }, []);

  const Profile = user;

  const [tweet, setTweet] = useState(1);

  if (!!Profile && !!image) {

    const Container = styled.View`
    flex: 1;
  `;



async function takeAndUploadPhotoAsync() {

  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.cancelled) {
    return;
  }

  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  let formData = new FormData();
  formData.append('photo', { uri: localUri, name: user.login, type });
  console.log(formData)
  return await fetch("http://192.168.1.242:3000/uploadImage", {
    method: 'POST',
    body: formData
  });
}

    let txt = null;

    const putDescription = async () => {
      await fetch("http://192.168.1.242:3000/addDescription", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: user.login, description: txt }),
          });
        }
    
        const addTweet = async () => {
          await fetch("http://192.168.1.242:3000/addTweet", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: user.login, tweet: txt }),
              });
            }

    const TweetList = () => { 
      return(
    Profile.tweets.map((tweet) =>
    <Tweets key={tweet} profile={Profile} image={image} text={tweet}></Tweets>
    )
    )
    }

    let tweetTxt = null;

    return (
      <Container>
        <ImageBackground resizeMode="cover" style={{flex: 1, justifyContent: "center"}} source={{uri: 'data:image/jpg;base64,'+ image}}>
        <SubContainer>
          <TouchableOpacity style={{position: "absolute", top: -25}} onPress={()=>{takeAndUploadPhotoAsync()}}>
            {!!image &&
          <Avatar source={{ uri:  'data:image/jpg;base64,'+ image}}></Avatar>}
          </TouchableOpacity>
          <FullName>{Profile.login}</FullName>
          <GrayText>{Profile.subText}</GrayText>
          <Description>{!Profile.description && (
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <TextInput style={{fontSize: 18, lineHeight: 35}} defaultValue={"Enter your description"} onChangeText={(text)=>{txt = text}}></TextInput><Button style={{marginLeft: 15, }} title={"Save"} onPress={async()=>{ putDescription();  }}></Button></View>
          )}{!!Profile.description && <View style={{flexDirection: "row"}}><Text style={{fontSize: 18, lineHeight: 35}}>{Profile.description}</Text><Button style={{marginLeft: 15, }} title={"Change"} onPress={async()=>{ txt=null; putDescription();  }}></Button></View>}</Description>
          <GrayText style={{ marginTop: 15 }}>
            <FontAwesome5 name="calendar-alt" size={14} color="black" /> Joined{" "}
            {Profile.dateOfRegistration}
          </GrayText>
          <ButtonContainer>
            <BlueButton onPress={() => { setModalVisibility(true) }}>
              <Text style={{ color: "white" }}>BAKA</Text>
            </BlueButton>
            <CallButton onPress={async() => { await AsyncStorage.removeItem('Login');}}>
              <Feather name="phone-call" size={24} color="white" />
            </CallButton>
          </ButtonContainer>
          {modalVisible && <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><TextInput style={{margin: 10, height: 40, borderColor: "#7a42f4", borderWidth: 1, minWidth: 280}} onChangeText={(txt)=>{tweetTxt = txt; }} defaultValue={"Enter your Tweet"}></TextInput><TouchableOpacity style={{height: 40, maxWidth: 50, borderWidth: 2}} onPress={async()=>{fetch("http://192.168.1.242:3000/addTweet", {method: "POST", headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }, body: JSON.stringify({name: Profile.login, tweet: tweetTxt})}); setModalVisibility(false)}}><Text>Post</Text></TouchableOpacity></View>}
        </SubContainer>
        <Tab>
          <Tabutton
            style={{
              borderBottomColor: tweet == 1 ? "#43a8f0" : "#000000",
              borderBottomWidth: tweet == 1 ? 2 : 0,
            }}
            onPress={() => {
              setTweet(1);
            }}
          >
            <Text style={{ color: tweet == 1 ? "#43a8f0" : "#000000" }}>
              KEKWAIT
            </Text>
          </Tabutton>
          <Tabutton
            style={{
              borderBottomColor: tweet == 2 ? "#43a8f0" : "#000000",
              borderBottomWidth: tweet == 2 ? 2 : 0,
            }}
            onPress={() => {
              setTweet(2);
            }}
          >
            <Text style={{ color: tweet == 2 ? "#43a8f0" : "#000000" }}>
              SUKAAA
            </Text>
          </Tabutton>
        </Tab>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
        <TweetList></TweetList>
        </ScrollView>
        </ImageBackground>
        <PlusButton onPress={async()=>{}}>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </PlusButton>
      </Container>
    );
  } else if (Profile == null || image == null) {
    return <View><Text>KEKWAIT</Text></View>;
  }
};

const ButtonContainer = styled.View`
  padding: 12px;
  flex-direction: row;
`;

const Tab = styled.View`
  flex-direction: row;

  background-color: #f1f1f1;
`;

const Tabutton = styled.TouchableOpacity`
  padding: 14px 16px;
  borderRightWidth: 2;
  borderRightColor: #000000;
`;

const Avatar = styled.Image`
  left: 5px;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  border: solid 2px #ffffff;
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

const BlueButton = styled.TouchableOpacity`
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
  color: #c0c0c0;
`;

const SubContainer = styled.View`
  margin-top: 40px;
  background: #ffffff;
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
  height: 64px;
  background: #2a86ff;
`;

UserProfileScreen.navigationOptions = {
  title: "UserProfile",
  headerTintColor: "#0000FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default UserProfileScreen;
