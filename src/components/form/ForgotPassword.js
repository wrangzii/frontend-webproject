import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Forgot password</b></h3>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="mb-2">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <Button value="Reset password" color="success" />
            </form>
        </div>
    );
}

export default Login