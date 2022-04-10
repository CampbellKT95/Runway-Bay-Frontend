import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FileBase from "react-file-base64";
import {createTenant, updateTenant} from "../../actions/tenants";
import "./styles.css";
import Contact from "../Contact/index";

const Form = ({currentId, setCurrentId}) => {

    const tenant = useSelector((state) => currentId ? state.tenants.find((t) => t._id === currentId) : null);

    const [tenantData, setTenantData] = useState({
        name: "", 
        company: "",
        contact: {
            phone: {
                business: "",
                cell: ""
            },
            email: "",
        },

        location: {
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip: null,
            property: {
                building: null,
                unit: null,
            }
        },

        comments: "",
        lease_details: {
            start_date: "",
            end_date: "",
            lease_length: null,
            signing: {
                signing_date: "",
                signing_payment: null,
            },

            due_day: null,
            monthly_amt: null,
            sales_tax: null,
            subtotal: null,
            total_paid: null,
            security: {
                security_received: false,
                security_amt: null,
                security_date_received: "",
            },

            last_month_security: false,
            certificate_liability: false
        },
        leaseFile: ""

    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (tenant) {
            setTenantData(tenant);
        }
    }, [tenant])

    const handleSubmit = () => {

        if (currentId) {
            dispatch(updateTenant(currentId, tenantData));

        } else {
            dispatch(createTenant(tenantData));

            // //
            // dispatch(scheduleReminder(tenantData.lease_details.start_date, tenantData.lease_details.end_date));
            // //
        } 
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setTenantData({
        name: "", 
        company: "",
        contact: {
            phone: {
                business: "",
                cell: ""
            },
            email: "",
        },

        location: {
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip: 0,
            property: {
                building: 0,
                unit: 0,
            }
        },

        comments: "",
        lease_details: {
            start_date: "",
            end_date: "",
            lease_length: 0,
            signing: {
                signing_date: "",
                signing_payment: 0,
            },

            due_day: 0,
            monthly_amt: 0,
            sales_tax: 0,
            subtotal: 0,
            total_paid: 0,
            security: {
                security_received: false,
                security_amt: 0,
                security_date_received: "",
            },

            last_month_security: false,
            certificate_liability: false
        },
        leaseFile: ""

    })}

    const [salesTax, setSalesTax] = useState(0)

    useEffect(() => {
        setSalesTax(tenantData.lease_details.monthly_amt * 0.065)

        setTenantData({...tenantData, lease_details: {...tenantData.lease_details, sales_tax: salesTax}})

    }, [tenantData.lease_details.monthly_amt])

    return (
        <>
        <h1 className="create-title">{`${currentId ? "Edit Tenant" : "Create New Tenant"}`}</h1>

        <Link to="/tenants"><button className="all-tenants-btn" onClick={() => {clear()}}>
            Back
        </button></Link>

        <form className="form-container">
            <div className="personal-info">

                <label className="name-label">*Name</label>
                <input value={tenantData.name} onChange={(e) => {setTenantData({...tenantData, name: e.target.value})}}/>

                <label className="company-label">*Company</label>
                <input value={tenantData.company} onChange={(e) => {setTenantData({...tenantData, company: e.target.value})}}/>

                <label className="phone-label">Phone</label>
                <input value={tenantData.contact.phone.business} onChange={(e) => {setTenantData({...tenantData, contact: {...tenantData.contact, phone: {...tenantData.contact.phone, business: e.target.value}}})}}/>

                <label className="cell-label">Cell</label>
                <input value={tenantData.contact.phone.cell} onChange={(e) => {setTenantData({...tenantData, contact: {...tenantData.contact, phone: {...tenantData.contact.phone, cell: e.target.value}}})}}/>

                <label className="email-label">*Email</label>
                <input value={tenantData.contact.email} onChange={(e) => {setTenantData({...tenantData, contact: {...tenantData.contact, email: e.target.value}})}} />
            </div>

            <div className="address-info">
                <label className="address-1-label">Address 1</label>
                <input value={tenantData.location.address_1} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, address_1: e.target.value}})}}/>

                <label className="address-2-label">Address 2</label>
                <input value={tenantData.location.address_2} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, address_2: e.target.value}})}}/>

                <label className="city-label">City</label>
                <input value={tenantData.location.city} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, city: e.target.value}})}}/>

                <label className="state-label">State</label>
                <input value={tenantData.location.state} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, state: e.target.value}})}}/>

                <label className="zip-label">Zip</label>
                <input value={tenantData.location.zip} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, zip: e.target.value}})}}/>

                <label className="building-label">*Building</label>
                <input value={tenantData.location.property.building} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, property: {...tenantData.location.property, building: e.target.value}}})}}/>

                <label className="unit-label">*Unit</label>
                <input value={tenantData.location.property.unit} onChange={(e) => {setTenantData({...tenantData, location: {...tenantData.location, property: {...tenantData.location.property, unit: e.target.value}}})}}/>
            </div>

            <div className="comment-section">
                <label className="comments-label">Comments</label>
                <textarea value={tenantData.comments} className="comments"  cols="30" rows="4" onChange={(e) => {setTenantData({...tenantData, comments: e.target.value})}}/>
            </div>
            <div className="lease-info">
                <label className="start-date-label">*Start Date</label>
                <input value={tenantData.lease_details.start_date} placeholder="mm dd yyyy" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, start_date: e.target.value}})}}/>

                <label className="end-date-label">*End Date</label>
                <input value={tenantData.lease_details.end_date} placeholder="mm dd yyyy" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, end_date: e.target.value}})}}/>

                <label className="lease-length-label">*Lease Length</label>
                <input value={tenantData.lease_details.lease_length} placeholder="# of Months" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, lease_length: e.target.value}})}}/>

                <label className="signing-date-label">Signing Date</label>
                <input value={tenantData.lease_details.signing.signing_date} placeholder="mm dd yyyy" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, signing: {...tenantData.lease_details.signing, signing_date: e.target.value}}})}}/>

                <label className="signing-payment-label">Signing Payment</label>
                <input value={tenantData.lease_details.signing.signing_payment} onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, signing: {...tenantData.lease_details.signing, signing_payment: e.target.value}}})}}/>
   
                <label className="rent-due-label">*Rent Due</label>
                <input value={tenantData.lease_details.due_day} placeholder="Day of month: 5"
                onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, due_day: e.target.value}})}}/>

                <label className="monthly-amt-label">*Monthly Payment</label>
                <input value={tenantData.lease_details.monthly_amt} onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, monthly_amt: e.target.value}})}}/>

                <label className="sales-tax-label">*Sales Tax</label>
                <input value={salesTax} onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, sales_tax: e.target.value}})}}/>

                <label className="subtotal-label">Subtotal</label>
                <input value={tenantData.lease_details.subtotal} onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, subtotal: e.target.value}})}}/>

                <label className="total-paid-label">Total Paid</label>
                <input value={tenantData.lease_details.total_paid} onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, total_paid: e.target.value}})}}/>
            </div>

            <div className="deposit-info">
                <label className="security-amount-label">Amount</label>
                <input className="deposit-shadow" value={tenantData.lease_details.security.security_amt} placeholder="security" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, security: {...tenantData.lease_details.security, security_amt: e.target.value}}})}}/>

                <label className="date-security-received-label">Date Received</label>
                <input className="deposit-shadow" value={tenantData.lease_details.security.security_date_received} placeholder="security" onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, security: {...tenantData.lease_details.security, security_date_received: e.target.value}}})}}/>

                <div className="security-check">
                    <input type="checkbox" name="security-deposit"
                    
                    checked={tenantData.lease_details.security.security_received ? true : false}

                    value={tenantData.lease_details.security.security_received}
                    onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, security: {...tenantData.lease_details.security, security_received: !tenantData.lease_details.certificate_liability}}})}}/>
                    <label for="security-deposit">Deposit</label>
                </div>

                <div className="last-check">
                    <input type="checkbox" name="last-month" 

                    checked={tenantData.lease_details.last_month_security ? "true" : false}

                    value={tenantData.lease_details.last_month_security}
                    onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, last_month_security: !tenantData.lease_details.certificate_liability}})}}/>
                    <label for="last-month">Last Month's</label>
                </div>

                <div className="liability-check">
                    <input type="checkbox" name="certificate-of-liability" value={tenantData.lease_details.certificate_liability}

                    checked={tenantData.lease_details.certificate_liability ? true: false}

                    onChange={(e) => {setTenantData({...tenantData, lease_details: {...tenantData.lease_details, certificate_liability: !tenantData.lease_details.certificate_liability}})}}/>

                    <label for="certificate-of-liability">Certificate of Liability</label>
                </div>
            </div>
            <div className="upload-create">
                <div className="file">
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setTenantData({ ...tenantData, leaseFile: base64})}
                        
                    />
                </div>
                <div>
                    <Link to="/tenants"><button className="btn" type="submit" onClick={handleSubmit}>
                        {`${currentId ? "Edit" : "Create"}`}
                    </button></Link>
                </div>
            </div>
        </form>
        <Contact />
        </>
    )
}


export default Form;
