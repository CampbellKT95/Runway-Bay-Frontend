import {MEMO} from "../constants/actionTypes.js";
import * as api from "../api";

export const sendMemo = (memo) => async (dispatch) => {
    try {
        const {data} = await api.memoAPI(memo);
        
        dispatch({type: MEMO, payload: memo})

    } catch (error) {
        console.log(error)
    }
}