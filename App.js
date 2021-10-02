import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FollowersScreen from "./screens/FollowersScreen";
import  store  from './redux/store'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #2a86ff;
  height: 45px;
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

async function findUser() {
  const userName = await AsyncStorage.getItem("Login");
  return userName;
}

async function getUser() {
  const userName = await AsyncStorage.getItem("Login");
  const user = await fetch("http://127.0.0.1:3000/getUser", {method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: userName}),
})
return await user.json()
}

function Root() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUser().then((user)=>{return user}));
  }, []);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen}/>
    </Tab.Navigator>
  );
}

function InnerApp(){

  const count = useSelector((state) => state.counter.value)
  const [update, setUpdate] = useState(count)
  const [user, setUser] = useState(null);

  useEffect( () => {
    setUpdate(count)
    const useIt = async () => {setUser(await findUser());}
    useIt()
  }, [count]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Base">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Followers" component={FollowersScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Base"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {!user && (
        <ButtonContainer>
          <Button
            onPress={() => {
              navigate("Registration");
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 22 }}>
              Зарегистрироваться
            </Text>
          </Button>
          <Button
            onPress={() => {
              navigate("Login");
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 22 }}>Войти</Text>
          </Button>
        </ButtonContainer>
      )}
    </NavigationContainer>
  );
}

function App() {

  return (
    <Provider store={store}>
      <InnerApp></InnerApp>
    </Provider>
  );
}

export default App;

//TASKS:
//1) Change EXIT button 2) Mobile test