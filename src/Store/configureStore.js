import { combineReducers } from "redux";
const initialState = {
    notes : []
  };
  
function noteList(state = initialState, action) {
    switch(action.type){
        case "SAVE_NOTE": 
            return {...state, notes:[...state.notes, action.data]} ;
        case "DELETE_NOTE":
            return {...state, notes:action.data} ;
        case "UPDATE_NOTE":
                return {...state, notes:action.data} ;
        default: 
            return initialState;  
    }
}
export default combineReducers({
    list:noteList
});


