import React, {useEffect, useState} from "react";
import { ScrollView, Text, View, TextInput, FlatList } from "react-native";
import styled from "styled-components/native";
import Group from "../components/Group";
import { Ionicons } from "@expo/vector-icons";
import MiniProfile from '../components/MiniProfile'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from 'react-redux'

const HomeScreen = ({ navigation }) => {
  const count = useSelector((state) => state.counter.value)
  
  const language = navigator.language
  const InnerText = language == "en" ? ["Search...", 'People that you follow:'] : ["Поиск...", 'Те, кого вы читаете:'];

  const [update,setUpdate] = useState(count)
  const [profile,setProfile] = useState(null)
  const [date, setDate] = useState('')
  const [trueUser, setTrueUser] = useState(null)

  useEffect(()=>{
    setUpdate(count)
    const getProfile = async () => {
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
    getProfile().then((person) => {
      setTrueUser(person);})

    const getUser = async () => {
      const user = await fetch("http://192.168.1.242:3000/getRandomUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return user.json();
    };
    getUser().then((person) => {
      setProfile(person);})

      const getDate = async () => {
        return (await fetch("http://worldtimeapi.org/api/ip")).json()
      }
      getDate().then((date)=>{setDate(date.datetime.substring(0,10))})
  },[count])

  const [list, setList] = useState(null)
  const setUser = async (user) => {
    let result = await fetch('http://192.168.1.242:3000/getSearch', {method: "POST", headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: user})})
    return result.json()
  }

  const renderItem = ({ item }) => (
    <MiniProfile profile={item} navigation={navigation}/>
  );

  const [txt, setText] = useState(InnerText[0])

  const FollowsList = () => {
    return trueUser.follows.map((follow) => (
      <MiniProfile profile={follow} navigation={navigation}></MiniProfile>
    ));
  };
  if(profile != null) {
  return (
    <Container>
      <TextInput style={{fontSize: 20, borderRadius: 40, backgroundColor: "#DADADA", paddingLeft: 10, marginBottom: 10}} value={txt} onChangeText={(text)=>{setText(text);(setUser(text).then((answer)=> {console.log(answer);setList(answer)}))}}></TextInput>
        {txt != "" && txt != InnerText[0] &&
        <FlatList data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>}
        <ScrollView>
        <Group
          groupTitle={date}
          items={profile}
          user={trueUser}
          navigation={navigation}
        />
        {!!trueUser &&
        <View>
        <GroupTitle>{InnerText[1]}</GroupTitle>
        <FollowsList></FollowsList></View>}
      </ScrollView>
    </Container>
  );
} else {return (<View></View>)}
}

const Container = styled.View`
  flex: 1;
  padding: 5px
`;

const GroupTitle = styled.Text`
padding-left: 20px;
padding-bottom: 10px;
  font-weight: 800;
  font-size: 22px;
  color: #000000;
`;

HomeScreen.navigationOptions = {
  title: "Home",
  headerTintColor: "#0000FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default HomeScreen;
