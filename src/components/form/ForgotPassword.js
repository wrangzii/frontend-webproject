import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleForgotPassword = () => {
        const raw = JSON.stringify({
            email
        });
        fetch('http://localhost:8080/forgot_password', {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                console.log(response);
                throw Error(response)
            })
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }
    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Forgot password</b></h3>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="mb-2">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="button" onClick={handleForgotPassword} className="btn btn-success">Reset password</button>
            </form>
        </div>
    );
}

export default ForgotPassword;