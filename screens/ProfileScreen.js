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

const ProfileScreen = ({ navigation, route }) => {
  const [currentUser, setCurrentUser] = useState(1);

  const login = route.params.login;
  const [refreshing, setRefreshing] = useState(false);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [tweet, setTweet] = useState(1);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const userName = login;
      const user = await fetch("http://192.168.1.242:3000/getUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      });
      setCurrentUser(await AsyncStorage.getItem("Login"));
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
  }, []);

  const Profile = user;

  if (!!Profile && !!image) {
    const Container = styled.View`
      flex: 1;
    `;

    const TweetList = () => {
      return Profile.tweets.map((tweet) => (
        <Tweets
          key={tweet}
          profile={Profile}
          image={image}
          text={tweet}
          crossBool={false}
        ></Tweets>
      ));
    };

    return (
      <Container>
        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
          source={{ uri: "data:image/jpg;base64," + image }}
        >
          <SubContainer>
            {!!image && (
              <Avatar
                source={{ uri: "data:image/jpg;base64," + image }}
              ></Avatar>
            )}
            <FullName>{Profile.login}</FullName>
            <GrayText>{Profile.subText}</GrayText>
            <Description>{Profile.description}</Description>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{navigation.navigate("Followers", {Profile: Profile, option: 1})}}>
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
              </TouchableOpacity>
            </View>
            <GrayText style={{ marginTop: 15 }}>
              <FontAwesome5 name="calendar-alt" size={14} color="black" />{" "}
              Joined {Profile.dateOfRegistration}
            </GrayText>
            <ButtonContainer>
              {!Profile.followers.includes(currentUser) && (
                <BlueButton
                  onPress={async () => {
                    fetch("http://192.168.1.242:3000/follow", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        oneWhoFollows: currentUser,
                        followed: Profile.login,
                      }),
                    });
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 20 }}>Follow</Text>
                </BlueButton>
              )}
              {Profile.followers.includes(currentUser) && (
                <BlueButton
                  onPress={async () => {
                    fetch("http://192.168.1.242:3000/stopFollowing", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        oneWhoFollows: currentUser,
                        followed: Profile.login,
                      }),
                    });
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 20 }}>
                    Stop Following
                  </Text>
                </BlueButton>
              )}
            </ButtonContainer>
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <TweetList></TweetList>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  } else if (Profile == null || image == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
  padding: 14px 16px;
  borderrightwidth: 2;
  borderrightcolor: #000000;
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

ProfileScreen.navigationOptions = {
  title: "UserProfile",
  headerTintColor: "#0000FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default ProfileScreen;
