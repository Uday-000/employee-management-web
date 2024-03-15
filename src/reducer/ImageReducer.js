import { Image_Form } from "../actions/ImageActions";

const initialState=[];
export const ImageReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case Image_Form:
            return[...state,payload]
        default:
            return state;
    }

}