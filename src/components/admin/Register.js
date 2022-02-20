import React from "react";
import Button from "../form/Button";

const Register = () => {
    return (
        <form className="px-3 mx-auto d-flex justify-content-center flex-column">
            <h3><b>Register a new account</b></h3>
            <div className="form-group mb-3">
                <label htmlFor="email" className="mb-2">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="mb-2">Password</label>
                <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="Select role" className="mb-3">Select role</label>
                <select class="form-select">
                    <optgroup label="Role">Role</optgroup>
                    <option value="Admin">Admin</option>
                    <option value="QA Manager">QA Manager</option>
                    <option value="QA Coordinator">QA Coordinator</option>
                    <option value="Staff">Staff</option>
                </select>
            </div>
            <Button value="Register" color="success" />
        </form>
    );
}

export default Register;