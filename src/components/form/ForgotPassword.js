import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()
    const handleForgotPassword = () => {
        const raw = JSON.stringify({
            email
        });
        fetch('http://localhost:8080/forgot_password', {
            method: 'POST',
            body: raw,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                console.log(response);
                throw Error(checkError())
            })
            .then(result => {
                notifySuccess(result.message)
            })
            .catch(error => createAlert(error))
    }

    function checkError() {
        let msg = ""
        if ($("input[type=email]").value === "") {
            msg = "Not allow blank"
        } else {
            msg = "This email address does not exist!"
        }
        return msg
    }

    function notifySuccess(msg) {
        const title = $("h3")
        const alert = document.createElement("p")
        title.after(alert)
        if (!$(".alert-success")) {
            title.after(alert)
        } else {
            $(".alert-success").remove()
            title.after(alert)
        }
        alert.textContent = msg
        alert.setAttribute("class", "alert alert-success")
    }

    function createAlert(message) {
        const title = $("h3")
        const alert = document.createElement("p")
        if (!$(".alert-danger")) {
            title.after(alert)
        } else {
            $(".alert-danger").remove()
            title.after(alert)
        }

        alert.textContent = message
        alert.setAttribute("class", "alert alert-danger")
    }

    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Forgot password</b></h3>
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