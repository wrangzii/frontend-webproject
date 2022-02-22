import React from "react";
import Button from "./form/Button";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <form className="px-3 mx-auto d-flex justify-content-center flex-column">
            <h3><b>Reset password</b></h3>
            <div className="form-group mb-3">
                <label htmlFor="email" className="mb-2">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <Button value="Reset password" color="success" />
            <Link to="/" className="btn btn-danger">Back to login</Link>
        </form>
    );
}

export default Login