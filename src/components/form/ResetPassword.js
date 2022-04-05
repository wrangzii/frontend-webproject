import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import Alert from "../alert/Alert"

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [className, setClassName] = useState("alert-success");

    const href = window.location.href
    let resetToken = href.substring(href.indexOf('=') + 1)

    useEffect(() => {
        if (password !== confirmPassword) {
            console.log("no!");
        } else {
            console.log("yes");
        }
    }, [password])

    const handleResetPassword = () => {
        axios({
            method: "POST",
            url: `http://localhost:8080/confirm_reset?token=${resetToken}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ password })
        })
            .then(response => {
                setIsAlert(true)
                setMessage(response.data.message)
                setClassName("alert-success")
            })
            .catch(error => {
                setIsAlert(true)
                setClassName("alert-danger")
                setMessage(error.response.data.error)
            })
    }

    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Reset password</b></h3>
                <Alert isAlert={isAlert} className={className} message={message} />
                <div className="mb-3">
                    <label htmlFor="newPassword" className="mb-2">New password</label>
                    <input type="password" className="form-control" placeholder="New password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="mb-2">Confirm new password</label>
                    <input type="password" className="form-control" placeholder="Confirm new password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Button value="Reset password" color="success" action={handleResetPassword} />
            </form>
        </div>
    );
}

export default ResetPassword;