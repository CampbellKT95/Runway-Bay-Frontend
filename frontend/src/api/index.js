import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000" })
// for production: "https://runway-bay.herokuapp.com"

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

export const fetchTenants = () => API.get("/tenants");

export const createTenant = (newTenant) => API.post("/tenants", newTenant);

export const updateTenant = (id, updatedTenant) => API.patch(`/tenants/${id}`, updatedTenant)

export const deleteTenant = (id) => API.delete(`/tenants/${id}`); 

export const signIn = (formData) => API.post("/users/signin", formData);

export const memoAPI = (memo) => API.post("/mailer", memo);

export const singleEmailAPI = (emailMessage) => API.post("/tenants/email", emailMessage)


// export const scheduleEmail = (tenant) => API.post("/tenants/schedule", tenant);

