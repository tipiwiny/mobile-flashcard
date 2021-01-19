import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import DeckList from './../DeckList'
import DeckSingle from './../DeckSingle'

const Stack = createStackNavigator();

export default function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeckList" component={DeckList} />
      <Stack.Screen name="DeckSingle" component={DeckSingle} />
    </Stack.Navigator>
  );
}



