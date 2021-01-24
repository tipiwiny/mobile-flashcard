import { ADD_CARD_TO_DECK, GET_ALL_DECKS, GET_BY_ID } from '../actions'

function decks (state = { list: [], deck: { questions: []}}, action) {
  switch (action.type) {
    case GET_ALL_DECKS :
      const normalizedDecks = Object.keys(action.decks).map(id => action.decks[id])
      return {
        ...state,
        list: normalizedDecks,
      }
    case GET_BY_ID :
        return {
          ...state,
          deck: action.deck,
        }

    case ADD_CARD_TO_DECK :
        return state
    default :
      return state
  }
}

export default decks