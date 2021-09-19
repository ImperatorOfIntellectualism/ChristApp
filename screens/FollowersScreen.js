import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
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
import MiniProfile from '../components/MiniProfile'
import AsyncStorage from "@react-native-async-storage/async-storage";

const FollowersScreen = ({ navigation, route }) => {
  const [option, setOption] = useState(route.params.option);
  const Profile = route.params.Profile

  const FollowerList = () => {
    return Profile.followers.map((follower) => (
      <MiniProfile profile={follower}></MiniProfile>
    ));
  };

  const FollowsList = () => {
    return Profile.follows.map((follow) => (
      <MiniProfile profile={follow}></MiniProfile>
    ));
  };

  return (
    <View>
      <View style={styles.Tab}>
        <TouchableOpacity onPress={()=>{setOption(1)}} style={option == 1 ? styles.TabuttonChosen : styles.Tabutton}>
          <Text style={option == 1 ? styles.TextButtonChosen : styles.TextButton}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setOption(2)}} style={option == 2 ? styles.TabuttonChosen : styles.Tabutton}>
          <Text style={option == 2 ? styles.TextButtonChosen : styles.TextButton}>Follows</Text>
        </TouchableOpacity>
      </View>
      {option == 1 ? <FollowerList></FollowerList> : <FollowsList></FollowsList>}
    </View>
  );
};

const styles = StyleSheet.create({
  Tab: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  Tabutton: {
    padding: "14px 16px",
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TabuttonChosen: {
    padding: "14px 16px",
    borderBottomWidth: 2,
    height: 60,
    borderBottomColor: "#82EEFD",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextButton: {
    fontSize: 24,
    textAlign: "center",
  },
  TextButtonChosen: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
  },
});

export default FollowersScreen;
