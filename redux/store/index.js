import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import combineReducers from "../reducers";
import { AsyncStorage } from "react-native";

// Default configuration for storing data
const Config = {
    key: "root", // storing data with a key named root
    storage: AsyncStorage, // type of storage
    // you can aadd blacklist or whitelist here
    // blacklist: [] // these will not be stored
    // whitelist: [] // only these will be stored
}

// reducers that are persisting 💪
const presist_reducers = persistReducer(Config, combineReducers)

// this is for react-redux Provider
export const store = createStore(presist_reducers);

// this is for redux-persist PersistGate
export const persistor = persistStore(store);