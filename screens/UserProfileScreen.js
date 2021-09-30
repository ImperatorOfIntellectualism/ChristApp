import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  RefreshControl,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import styled from "styled-components/native";
import Tweets from "../components/Tweets";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slice'

const UserProfileScreen = ({navigation}) => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const [update, setUpdate] = useState(count);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [tweetState, setTweetState] = useState(1);
  const [date, setDate] = useState('')

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setUpdate(count)
    const getDate = async () => {
      return (await fetch("http://worldtimeapi.org/api/ip")).json()
    }
    getDate().then((date)=>{setDate(date.datetime.substring(0,10))})

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
    getUser().then((person) => {
      setUser(person);

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
      };
      getImage().then((image) => {
        setImage(image);
      });
    });
  }, [count]);

  const Profile = user;

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
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: user.login, type });
      return await fetch("http://192.168.1.242:3000/uploadImage", {
        method: "POST",
        body: formData,
      });
    }

    const putDescription = async () => {
      await fetch("http://192.168.1.242:3000/addDescription", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user.login, description: txt }),
      });
    };

    const TweetList = () => {
      return Profile.tweets.reverse().map((tweet) => (
        <Tweets
          key={tweet}
          profile={Profile}
          image={image}
          text={tweet}
          crossBool={true}
          tweetState={tweetState}
        ></Tweets>
      ));
    };

    let txt = null;
    let tweetTxt = null;

    return (
      <Container>
        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
          source={{ uri: "data:image/jpg;base64," + image }}
        >
          <SubContainer>
            <TouchableOpacity
              style={{ position: "absolute", top: -25 }}
              onPress={() => {
                takeAndUploadPhotoAsync();
              }}
            >
              {!!image && (
                <Avatar
                  source={{ uri: "data:image/jpg;base64," + image }}
                ></Avatar>
              )}
            </TouchableOpacity>
            <FullName>{Profile.login}</FullName>
            <GrayText>{Profile.subText}</GrayText>
            <Description>
              {!Profile.description && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    style={{ fontSize: 18, lineHeight: 35 }}
                    defaultValue={"Enter your description"}
                    onChangeText={(text) => {
                      txt = text;
                    }}
                  ></TextInput>
                  <Button
                    style={{ marginLeft: 15 }}
                    title={"Save"}
                    onPress={async () => {
                      putDescription();
                      dispatch(increment())
                    }}
                  ></Button>
                </View>
              )}
              {!!Profile.description && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, lineHeight: 35 }}>
                    {Profile.description}
                  </Text>
                  <Button
                    style={{ marginLeft: 15 }}
                    title={"Change"}
                    onPress={async () => {
                      txt = null;
                      putDescription();
                      dispatch(increment())
                    }}
                  ></Button>
                </View>
              )}
            </Description>
            <View style={{flexDirection: "row"}}><TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{navigation.navigate("Followers", {Profile: Profile, option: 1})}}>
              <GrayText style={{ fontSize: 18 }}>Followers: </GrayText>
              <Text style={{ fontSize: 18, fontWeight: 800 }}>
                {Profile.followers.length}
              </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigation.navigate("Followers", {Profile: Profile, option: 2})}} style={{flexDirection: "row"}}>
              <GrayText style={{ fontSize: 18, marginLeft: 15 }}>
                Follows:
              </GrayText>
              <Text style={{ fontSize: 18, fontWeight: 800 }}>
                {Profile.follows.length}
              </Text>
              </TouchableOpacity></View>
            <GrayText style={{ marginTop: 15 }}>
              <FontAwesome5 name="calendar-alt" size={14} color="black" />{" "}
              Joined {Profile.dateOfRegistration}
            </GrayText>
            <ButtonContainer>
              <BlueButton
                onPress={() => {
                  if(!modalVisible){
                  setModalVisibility(true);}
                  else if(modalVisible)
                  {setModalVisibility(false)}
                }}
              >
                <Text style={{ color: "white" }}>{modalVisible && "Close"}{!modalVisible && "Write a Tweet!"}</Text>
              </BlueButton>
              <CallButton
                onPress={async () => {
                  await AsyncStorage.removeItem("Login");
                  dispatch(increment())
                  navigation.navigate("Home")
                }}
              >
                <Feather name="phone-call" size={24} color="white" />
              </CallButton>
            </ButtonContainer>
            {modalVisible && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{
                    margin: 10,
                    height: 40,
                    borderColor: "#7a42f4",
                    borderWidth: 1,
                    minWidth: 280,
                  }}
                  onChangeText={(txt) => {
                    tweetTxt = txt;
                  }}
                  defaultValue={"Enter your Tweet"}
                ></TextInput>
                <TouchableOpacity
                  style={{ height: 40, maxWidth: 50, borderWidth: 2 }}
                  onPress={async () => {
                   if(tweetTxt != ""){
                    fetch("http://192.168.1.242:3000/addTweet", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: Profile.login,
                        tweet: {tweetTxt: tweetTxt, tweetDate: date},
                      }),
                    });
                    setModalVisibility(false);
                    dispatch(increment())
                  }
                  else alert("Enter your tweet")
                  }}
                >
                  <Text>Post</Text>
                </TouchableOpacity>
              </View>
            )}
          </SubContainer>
          <Tab>
            <Tabutton
              style={{
                borderBottomColor:tweetState== 1 ? "#43a8f0" : "#000000",
                borderBottomWidth:tweetState== 1 ? 2 : 0,
              }}
              onPress={() => {
                setTweetState(1);
              }}
            >
              <Text style={{ color:tweetState== 1 ? "#43a8f0" : "#000000" }}>
                Tweets
              </Text>
            </Tabutton>
            <Tabutton
              style={{
                borderBottomColor:tweetState== 2 ? "#43a8f0" : "#000000",
                borderBottomWidth:tweetState== 2 ? 2 : 0,
              }}
              onPress={() => {
                setTweetState(2);
              }}
            >
              <Text style={{color:tweetState== 2 ? "#43a8f0" : "#000000" }}>
                Tweets & replies
              </Text>
            </Tabutton>
          </Tab>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <TweetList></TweetList>
          </ScrollView>
        </ImageBackground>
        <PlusButton onPress={async () => {}}>
          <Ionicons name="add-circle-outline" size={38} color="black" />
        </PlusButton>
      </Container>
    );
  } else if (Profile == null || image == null) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Loading...</Text>
      </View>
    );
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
flex: 1;
align-items: center;
    justify-content: center;
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
