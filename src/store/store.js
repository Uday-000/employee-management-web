import { applyMiddleware, createStore } from "redux";
import RootReducer from "../reducer/RootReducer";
import { thunk } from "redux-thunk";


const middleware=[thunk]

const store=createStore(
    RootReducer,
    initialState,
    applyMiddleware(...middleware)

);