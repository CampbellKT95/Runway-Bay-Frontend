import {combineReducers} from "redux";

import tenants from "./tenants";
import auth from "./auth";
import memo from "./mailer";

export default combineReducers({
    tenants,
    auth,
    memo
})