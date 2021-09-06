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
  const user = await fetch("http://192.168.1.242:3000/getUser", {method: 'POST',
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
  useEffect(async () => {
    setUser(await getUser());
  }, []);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen}/>
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    setUser(await findUser());
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Base">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
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

export default App;
