import { combineReducers } from "redux";
import {RegisterReducer} from "./RegisterReducer"
import { FilterReducer } from "./FilterReducer";
import { ImageReducer } from "./ImageReducer";
import UserDetailsReducer from "./UserDetailsReducer";

export default combineReducers({
    register: RegisterReducer,
    filter:FilterReducer,
    image:ImageReducer,
    user:UserDetailsReducer
})