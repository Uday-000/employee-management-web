
const initialState=[];

export const RegisterReducer = (state= initialState, { type, payload }) => {
    switch (type) {
      case REGISTER_FORM:
        return [...state,payload];
    
      default:
        return state;
    }
  };