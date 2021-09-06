import React, {useEffect} from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import Group from "../components/Group";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Data = {
  Group1: {
    groupTitle: "14 Сентября",
    items: [
      {
        time: "15:00",
        uri: "https://e1.pngegg.com/pngimages/411/363/png-clipart-goku-dbs-son-goku-thumbnail.png",
        login: "AAAIIIEEE",
        subText: "JOBBER",
        active: true,
      },
      {
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
        time: "15:00",
        login: "AAAIIIEEE",
        uri: null,
        subText: "JOBBER",
        active: true,
      },
      {
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

  return (
    <Container>
      <ScrollView>
        <Group
          groupTitle={Data.Group1.groupTitle}
          items={Data.Group1.items}
          navigation={navigation}
        />
        <Group
          groupTitle={Data.Group2.groupTitle}
          items={Data.Group2.items}
          navigation={navigation}
        />
        <Group
          groupTitle={Data.Group2.groupTitle}
          items={Data.Group2.items}
          navigation={navigation}
        />
        <Group
          groupTitle={Data.Group2.groupTitle}
          items={Data.Group2.items}
          navigation={navigation}
        />
        <Group
          groupTitle={Data.Group2.groupTitle}
          items={Data.Group2.items}
          navigation={navigation}
        />
        <Group
          groupTitle={Data.Group2.groupTitle}
          items={Data.Group2.items}
          navigation={navigation}
        />
      </ScrollView>
      <PlusButton>
        <Ionicons name="add-circle-outline" size={38} color="black" />
      </PlusButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
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
