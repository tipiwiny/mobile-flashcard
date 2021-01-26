import { getDecks,addCardToDeck,addDeck } from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const GET_BY_ID = "GET_BY_ID"
export const ADD_CARD = "ADD_CARD"


export const fetchGetDecks = () => async (dispatch) => {
  const decks = await getDecks();
  dispatch({
    type: GET_ALL_DECKS,
    decks
  });
};

export const getDeckById = (deckId) => async (dispatch) => {
  const deck = (await getDecks())[deckId];
  dispatch({
    type: GET_BY_ID,
    deck
  });
};



export const saveCardToDeck = (deckId, card) => async dispatch => {
    await addCardToDeck(deckId,card)
    dispatch({  
      type: ADD_CARD_TO_DECK
    });
  };

export const addNewDeck = (title) => async dispatch => {
    const  response= await addDeck(title)
    dispatch({  
      type: ADD_CARD_TO_DECK
    });
    return response
};
