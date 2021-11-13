import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendMemo} from "../../actions/mailer";
import "./styles.css";
import Contact from "../Contact/index";

const Mailer = () => {

    const dispatch = useDispatch();

    const [memo, setMemo] = useState("");

  const transferMemo = (e) => {
    e.preventDefault();
    dispatch(sendMemo({memo: memo}));
    setMemo("")
  }

    return (
        <>
            <h1 className="tenants-title">Contact All Clients</h1>

            <form className="memo-container" onSubmit={transferMemo}>
                <textarea value={memo} className="memo" cols="30" rows="4" placeholder="Message Tenants" onChange={(e) => setMemo(e.target.value)}/>
                <button className="send-btn send-link" type="submit">
                    Send
                </button>
            </form>
            <Link to="/tenants">
                <button className="back-btn">Back</button>
            </Link>
            <Contact />
        </>
    )
}

export default Mailer;