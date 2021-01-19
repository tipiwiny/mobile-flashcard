import  AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./data.json";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    console.log('holita')

    if (decks) {return JSON.parse(decks)}
    else {
      await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
};


