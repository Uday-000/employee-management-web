import { applyMiddleware, createStore } from "redux";
import RootReducer from "../reducer/RootReducer";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
