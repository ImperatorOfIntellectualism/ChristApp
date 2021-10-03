import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Group = ({groupTitle, items, navigation, user }) => {
  const language = navigator.language
  const InnerText = language == "en" ? ["Follow:", 'Followed'] : ["Читать", "Читаемый"];
  console.log(items)
  if (user != null){
return(
<GroupContainer>
        <GroupTitle>
          {groupTitle}
        </GroupTitle>
            {items.map(item => 
        <GroupItem key={item.login} onPress={async () => {if (item.login == await AsyncStorage.getItem("Login")) {navigation.navigate('UserProfile')} else {navigation.navigate('Profile', {login: item.login})}}}>
          <Avatar source={{uri: "data:image/jpg;base64," + item.img.data }}>
          </Avatar>
          <View style={{paddingLeft: 10, flex: 1}}>
          <FullName>{item.login}</FullName>
          <GrayText>{item.subText}</GrayText>
          </View>
          {item.login != user.login &&
          <GroupData active={true}>{user.follows.includes(item.login) && InnerText[1]}{!user.follows.includes(item.login) && InnerText[0]}</GroupData>}
        </GroupItem>)}
      </GroupContainer>
)
}
return(
  <GroupContainer>
          <GroupTitle>
            {groupTitle}
          </GroupTitle>
              {items.map(item => 
          <GroupItem key={item.login} onPress={async () => {if (item.login == await AsyncStorage.getItem("Login")) {navigation.navigate('UserProfile')} else {navigation.navigate('Profile', {login: item.login})}}}>
            <Avatar source={{uri: "data:image/jpg;base64," + item.img.data }}>
            </Avatar>
            <View style={{paddingLeft: 10, flex: 1}}>
            <FullName>{item.login}</FullName>
            <GrayText>{item.subText}</GrayText>
            </View>
          </GroupItem>)}
        </GroupContainer>
  )
}


Group.defaultProps = {
  groupTitle: 'Untitled',
  items: []
};



const Avatar = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const GroupItem = styled.TouchableOpacity`
padding: 20px 0;
flex-direction: row;
align-items: center;
borderBottomWidth: 2px;
`;

const GroupData = styled.Text`
background: ${props => props.active ? "#2A86FF;" : "#AFE2F0;"};
padding: 4px;
border-radius: 18px;
font-weight: 600;
color: ${props => props.active ? "#FFFFFF;" : "#00499C;"};;
font-size: 15px;
width: 90px;
height: 32px;
text-align: center;
line-height; 28px;
`;

const GrayText = styled.Text`
  font-size: 14px;
  color: #C0C0C0;
`;

const GroupTitle = styled.Text`
  font-weight: 800;
  font-size: 22px;
  color: #000000;
`;

const GroupContainer = styled.View`
padding: 0 20px;
margin-bottom: 15px;
`;

export default Group;