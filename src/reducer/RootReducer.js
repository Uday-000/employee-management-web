import { combineReducers } from "redux";
import RegisterReducer from "./RegisterReducer"
import { FilterReducer } from "./FilterReducer";

export default combineReducers({
    register: RegisterReducer,
    filter:FilterReducer
})