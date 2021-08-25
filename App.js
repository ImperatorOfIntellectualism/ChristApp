import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";
import Group from "./components/Group";
import {Ionicons} from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen";
import { FontAwesome } from '@expo/vector-icons';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen
  }
});

export default createAppContainer(AppNavigator);