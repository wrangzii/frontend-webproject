import React from "react";
import { Routes, Route } from 'react-router-dom';

const Login = () => {
    return (
        <div className="d-flex">
            <form className="px-3 mx-auto d-flex justify-content-center flex-column">
                <h3><b>Reset password</b></h3>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="mb-2">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}

export default Login