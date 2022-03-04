import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const AddDepart = () => {

    let navigate = useNavigate();
    const [depart, setDepart] = useState({
        name: "",
        description: "",
    });

    const { name, description } = depart;
    const onInputChange = e => {
        setDepart({ ...depart, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:8080/department/add", depart);
        navigate("/departments");
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Add New Department</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="department-name">Department Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Department"
                        name="name"
                        value={name}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Description"
                        name="description"
                        value={description}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-primary px-3 mr-3">Add Department</button>
                    <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddDepart;