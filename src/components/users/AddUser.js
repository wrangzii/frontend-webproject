import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {

    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
    });

    const { name, username, email, phone } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3003/users", user);
        navigate("/list-user");
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-2 p-md-5">
            <h2 className="text-center mb-4">Add New User</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Name"
                        name="name"
                        value={name}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Username"
                        name="username"
                        value={username}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Your E-mail Address"
                        name="email"
                        value={email}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Phone Number"
                        name="phone"
                        value={phone}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-primary px-3 mr-3">Add User</button>
                    <Link to="/list-user" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddUser;