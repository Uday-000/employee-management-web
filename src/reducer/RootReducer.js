import { combineReducers } from "redux";
import {RegisterReducer} from "./RegisterReducer"
import { FilterReducer } from "./FilterReducer";
import { ImageReducer } from "./ImageReducer";
import UserDetailsReducer from "./UserDetailsReducer";
import TicketDetailsReducer from "./TicketReducer";

export default combineReducers({
    register: RegisterReducer,
    filter:FilterReducer,
    image:ImageReducer,
    user:UserDetailsReducer,
    ticket:TicketDetailsReducer
})