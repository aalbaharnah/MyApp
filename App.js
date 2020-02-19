import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from "./navigation"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store";


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
