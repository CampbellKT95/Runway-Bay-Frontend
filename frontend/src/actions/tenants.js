import {FETCH_ALL, CREATE, UPDATE, DELETE, SINGLE_EMAIL} from "../constants/actionTypes.js";
import * as api from "../api";

export const getTenants = () => async (dispatch) => {

    try {
        const {data} = await api.fetchTenants();

        dispatch({type: FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
};

export const createTenant = (tenant) => async (dispatch) => {
    try {
        const { data } = await api.createTenant(tenant);

        dispatch({type: CREATE, payload: data});

    } catch (error) {
        console.log(error)
    }
}

export const updateTenant = (id, tenant) => async (dispatch) => {
    try {
        const {data} = await api.updateTenant(id, tenant);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTenant = (id) => async (dispatch) => {
    try {
        await api.deleteTenant(id);

        dispatch({type: DELETE, payload: id});

    } catch (error) {
        console.log(error);
    }
}

export const singleEmail = (emailMessage) => async (dispatch) => {
    try {
        const {data} = await api.singleEmailAPI(emailMessage);

        dispatch({type: SINGLE_EMAIL, payload: data})
        
    } catch (error) {
        console.log(error)
    }
}

// //
// export const scheduleReminder = (tenant) => async (dispatch) => {
//     try {
//         await api.scheduleEmail(tenant);

//         dispatch({type: SCHEDULE, payload: tenant});
//     } catch (error) {
//         console.log(error)
//     }
// };
// //
