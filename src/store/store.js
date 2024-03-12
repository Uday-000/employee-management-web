import { applyMiddleware, createStore } from "redux";
import RootReducer from "../reducer/RootReducer";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const middleware = [thunk];

const presistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(presistConfig, RootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
