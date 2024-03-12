const initialState = {
  userDetails: null,
};


export const UserDetailsReducer = (state = initialState, action) => {
    console.log("in reducer",action.payload)
  switch (action.type) {
    case "SET_USER_DETAILS":
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};


export default UserDetailsReducer;
