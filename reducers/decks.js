import { GET_ALL_DECKS } from '../actions'

function decks (state = { list: []}, action) {
  switch (action.type) {
    case GET_ALL_DECKS :
      const normalizedDecks = Object.keys(action.decks).map(id => action.decks[id])
      return {
        ...state,
        list: normalizedDecks,
      }
    default :
      return state
  }
}

export default decks