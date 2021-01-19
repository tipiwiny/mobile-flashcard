import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { createStore } from 'redux'
import Views from "./views";
import reducer from './reducers'
import middleware from "./middleware"
const store = createStore(reducer, middleware)

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Views />
      </PaperProvider>
    </StoreProvider>
  );
}
