import {MEMO} from "../constants/actionTypes.js";

const memoReducer = (state = "", action) => {
    switch (action.type) {
        case MEMO: 
            return action.payload;
        default:
            return state
    }

};

export default memoReducer;