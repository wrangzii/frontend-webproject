import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <h3><b>Forgot password</b></h3>
            <div className="form-group mb-3">
                <label htmlFor="email" className="mb-2">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <Button value="Reset password" color="success" />
            <Link to="/" className="btn btn-danger">Back to login</Link>
        </>
    );
}

export default Login