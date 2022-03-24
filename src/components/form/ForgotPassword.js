import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../alert/Alert";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [className, setClassName] = useState("alert-success")

    const handleForgotPassword = () => {
        const raw = JSON.stringify({
            email
        });
        fetch('http://localhost:8080/forgot_password', {
            method: 'POST',
            body: raw,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                setMessage(result.message)
                setIsAlert(true)
                if (result.status === "200 OK") {
                    setClassName("alert-success")
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }

    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Forgot password</b></h3>
                <Alert isAlert={isAlert} className={className} message={message} />
                <div className="form-group mb-3">
                    <label htmlFor="email" className="mb-2">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="button" onClick={handleForgotPassword} className="btn btn-success">Reset password</button>
                <Link to="/login" className="btn btn-danger mt-2">Back to login</Link>
            </form>
        </div>
    );
}

export default ForgotPassword;