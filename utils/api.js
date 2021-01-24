import  AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./data.json";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
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

export async function addCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

