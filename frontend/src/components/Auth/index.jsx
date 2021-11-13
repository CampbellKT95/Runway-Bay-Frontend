import "./styles.css";
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import decode from "jwt-decode";
import {signin} from "../../actions/auth";
import Contact from "../Contact/index";
import { LOGOUT } from "../../constants/actionTypes";

const initialState = {username: "", password: ""}

const Auth = ({user, setUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // const token = user?.token;

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        let chosenField = e.target
        if (chosenField.name === "username") {
            setFormData({...formData, username: e.target.value});
        } else {
            setFormData({...formData, password: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signin(formData, history))
    }

    return (
        <>
            <section className="login-background">
                <h2 className="login-title">Runway Bay</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={formData.username}
                        onChange={handleChange} name="username" autoFocus
                    />
                    <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password"
                    />

                    <button type="submit">Login</button>
                </form>
                <Contact />
            </section>
        </>
    )
}

export default Auth;