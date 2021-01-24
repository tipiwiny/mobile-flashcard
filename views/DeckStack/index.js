import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import NewQuestion from './NewQuestion';
import DeckList from './DeckList'
import DeckSingle from './DeckSingle'
import StartQuiz from './StartQuiz';

const Stack = createStackNavigator();

export default function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeckList" component={DeckList} />
      <Stack.Screen name="DeckSingle" component={DeckSingle} />
      <Stack.Screen name="NewQuestion" component={NewQuestion} />
      <Stack.Screen name="StartQuiz" component={StartQuiz} />
    </Stack.Navigator>
  );
}



