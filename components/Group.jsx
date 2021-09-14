import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Group = ({groupTitle, items, navigation }) => {
return(
<GroupContainer>
        <GroupTitle>
          {groupTitle}
        </GroupTitle>
            {items.map(item => 
        <GroupItem key={item.id} onPress={async () => {if (item.login == await AsyncStorage.getItem("Login")) {navigation.navigate('UserProfile')} else {navigation.navigate('Profile', {login: item.login})}}}>
          <Avatar source={{uri: item.uri}}>
          </Avatar>
          <View style={{paddingLeft: 10, flex: 1}}>
          <FullName>{item.login}</FullName>
          <GrayText>{item.subText}</GrayText>
          </View>
          <GroupData active={item.active}>{item.time}</GroupData>
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
width: 70px;
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