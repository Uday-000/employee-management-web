
const initialState={
    ticketDetails:[],
};

export const TicketDetailsReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_TICKET_DETAILS":
            return{...state,ticketDetails:action.payload };
        default:
            return state;
        }
    };

    export default TicketDetailsReducer;
