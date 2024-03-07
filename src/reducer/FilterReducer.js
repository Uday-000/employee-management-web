const initialState=[];
import { FILTER_FORM } from "../actions/FiltersActions";
export const FilterReducer = (state= initialState, action) => {
    const {type,payload}=action;
    switch (type) {
      case FILTER_FORM:
        return [...state,payload];
    
      default:
        return state;
    }
  };
