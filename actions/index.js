import { getDecks } from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS";

export const fetchGetDecks = () => async (dispatch) => {
  const decks = await getDecks();
  dispatch({
    type: GET_ALL_DECKS,
    decks
  });
};
