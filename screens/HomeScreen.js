import React, {useEffect, useState} from "react";
import { ScrollView, Text, View, TextInput, FlatList } from "react-native";
import styled from "styled-components/native";
import Group from "../components/Group";
import { Ionicons } from "@expo/vector-icons";
import MiniProfile from '../components/MiniProfile'

const Data = {
  Group1: {
    groupTitle: "14 Сентября",
    items: [
      {
        id: 1,
        time: "15:00",
        uri: "https://e1.pngegg.com/pngimages/411/363/png-clipart-goku-dbs-son-goku-thumbnail.png",
        login: "Kakarot",
        subText: "JOBBER",
        active: true,
      },
      {
        id: 2,
        time: "16:00",
        uri: "https://64.media.tumblr.com/e3544a46f7798594a2782ed4fd9574a7/eb916997e38a5008-12/s640x960/1f87b735cfa10d1c68e2a02689a1ed0ac9a1335f.jpg",
        login: "CHAD",
        subText: "GOD",
        active: false,
      },
    ],
  },
  Group2: {
    groupTitle: "17 Сентября",
    items: [
      {
        id: 3,
        time: "15:00",
        login: "AAAIIIEEE",
        uri: null,
        subText: "JOBBER",
        active: true,
      },
      {
        id: 4,
        time: "16:00",
        uri: "https://64.media.tumblr.com/e3544a46f7798594a2782ed4fd9574a7/eb916997e38a5008-12/s640x960/1f87b735cfa10d1c68e2a02689a1ed0ac9a1335f.jpg",
        login: "CHAD",
        subText: "GOD",
        active: false,
      },
    ],
  },
};

const HomeScreen = ({ navigation }) => {

  const [profile,setProfile] = useState(null)
  const [date, setDate] = useState('')

  useEffect(()=>{
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
  },[])

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

  const [txt, setText] = useState("Search...")

  if(profile != null) {
  return (
    <Container>
      <TextInput style={{fontSize: 20, borderRadius: 40, backgroundColor: "#DADADA", paddingLeft: 10, marginBottom: 10}} value={txt} onChangeText={(text)=>{setText(text);(setUser(text).then((answer)=> {console.log(answer);setList(answer)}))}}></TextInput>
      <ScrollView>
        {console.log(txt)}
        {txt != "" &&
        <FlatList data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>}
        <Group
          groupTitle={date}
          items={profile}
          navigation={navigation}
        />
      </ScrollView>
      <PlusButton>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </PlusButton>
    </Container>
  );
} else {return (<View></View>)}
}

const Container = styled.View`
  flex: 1;
  padding: 5px
`;

const PlusButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  width: 64px;
  height: 64px;
  background: #2a86ff;
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
