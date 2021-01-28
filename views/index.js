import  React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { setLocalNotification } from '../utils/helper'
import DeckStack from './DeckStack'
import NewDeck from './NewDeck'


const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  async componentDidMount() {
    await setLocalNotification()
  }
  render(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color}) => {
            const icons = {
              deckList: <AntDesign name="home" size={24} color={color} />,
              AddDeck: <Entypo name="add-to-list" size={24} color={color} />,
            };
            return icons[route.name];
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="deckList" component={DeckStack} options={{ title: 'Home'}}/>
        <Tab.Screen name="AddDeck" component={NewDeck}  options={{ title: 'Add Deck'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );}
}
