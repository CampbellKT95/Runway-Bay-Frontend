import React, {useState, useEffect} from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import "./styles.css";
import {useDispatch} from "react-redux";
import {deleteTenant} from "../../actions/tenants";

//
import {singleEmail} from "../../actions/tenants";
//

import {Link} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';

const SingleTenant = ({...props}) => {
    const dispatch = useDispatch();

    const receivedProp = props.tenant

    const [dateSuffix, setDateSuffix] = useState("th");

    const date = receivedProp[0].lease_details.due_day

    const suffix = () => {
        if (date === 1 | date === 21 | date === 31) {
            setDateSuffix("st")
        } else if (date === 2 | date === 22) {
            setDateSuffix("nd")
        } else if (date === 3 | date === 23) {
            setDateSuffix("rd")
        } else {
            setDateSuffix("th")
        };
    }

    useEffect(() => {
        suffix();
    }, [dateSuffix]);


    const email = receivedProp[0].contact.email;

    const emailClick = () => {
        setModal(true)
    }

    const [modal, setModal] = useState(false);

    const offClick = (e) => {
        e.preventDefault();
        setModal(false)
    }

   const [message, setMessage] = useState("")

   const [emailMessage, setEmailMessage] = useState({
       email: email,
       message: ""
   })

   const handleMessage = (e) => {
    setMessage(e.target.value)
    setEmailMessage({...emailMessage, message: e.target.value})
   }

   const submitMessage = (e) => {
    e.preventDefault();

    dispatch(singleEmail(emailMessage));

    setEmailMessage({email: "", message: ""})
    setModal(false)
   }


    return (
        <div className="tenant">
            <h1 className="tenant-name">{receivedProp[0].name}</h1>

            <h4 className="rent">{`Rent: $${receivedProp[0].lease_details.monthly_amt} on the
            ${receivedProp[0].lease_details.due_day}`}{dateSuffix}</h4>

                {receivedProp[0].location.property.building.map((item) => {
                return <p className="property-building">Building: {item}</p>
            })}

            {receivedProp[0].location.property.unit.map((item) => {
                return <p className="property-unit">Unit: {item}</p>
            })}

            <div className="btn-container">
                <a href={receivedProp[0].leaseFile} className="lease-file icons"><DescriptionIcon /></a>

                <Link to="/form"><button onClick={() => props.setCurrentId(receivedProp[0]._id)} className="tenant-btn">
                    <ModeEditIcon className="icons" />
                </button></Link>

                <button className="tenant-btn icons" onClick={emailClick}>
                <EmailIcon />
                </button>

                <button onClick={() => dispatch(deleteTenant(receivedProp[0]._id))} className="tenant-btn">
                    <DeleteIcon className="icons" />
                </button>

                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={modal}
                >
                    <form className="modal-container">
                        <input value={email} className="modal-email-address"/>
                        <textarea value={message} className="modal-email-message"
                        onChange={(e) => handleMessage(e)} 
                        className="comments"  cols="30" rows="4" />
                        <button onClick={submitMessage} className="modal-btn">Send</button>
                        <button onClick={offClick} className="modal-btn">Back</button>
                    </form>
                </Backdrop>

            </div>
        </div>
    )
}

export default SingleTenant;
