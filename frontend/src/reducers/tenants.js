
import {FETCH_ALL, CREATE, UPDATE, DELETE, SINGLE_EMAIL} from "../constants/actionTypes.js";

export default (tenants = [], action) => {
    switch(action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...tenants, action.payload];
        case UPDATE:
            return tenants.map((tenant) => tenant._id === action.payload._id ? action.payload : tenant);
        case DELETE:
            return tenants.filter((tenant) => tenant._id !== action.payload);
        case SINGLE_EMAIL:
            return action.payload;
        default:
            return tenants;
    }
}
