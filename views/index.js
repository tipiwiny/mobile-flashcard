import  React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DeckStack from './DeckStack'


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen name="AddDeck" component={SettingsScreen}  options={{ title: 'Add Deck'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
