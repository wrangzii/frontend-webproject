import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: ""
    });

    const { name, email, phone, department, role } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/users/${id}`, user);
        navigate("/users");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3003/users/${id}`)
        setUser(result.data);
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Edit User</h2>
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

                <div className="form-group">
                    <select
                        name="department"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Department"
                        value={department}
                        onChange={e => onInputChange(e)}
                    >
                        <optgroup label="Department">
                            <option value="QA department">QA department</option>
                            <option value="Falcuty of IT">Falcuty of IT</option>
                            <option value="HR department">HR department</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group">
                    <select
                        name="role"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Role"
                        value={role}
                        onChange={e => onInputChange(e)}
                    >
                        <optgroup label="Role">
                            <option value="Admin">Admin</option>
                            <option value="QA manager">QA manager</option>
                            <option value="QA coordinator">QA coordinator</option>
                            <option value="Staff">Staff</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-warning px-3 mr-3">Update</button>
                    <Link to="/users" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditUser;