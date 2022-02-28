import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

const EditDepart = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [depart, setDepart] = useState({
        name: "",
        description: "",
    });

    const { name, description } = depart;
    const onInputChange = e => {
        setDepart({ ...depart, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadDepart();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/departs/${id}`, depart);
        navigate("/departments");
    };

    const loadDepart = async () => {
        const result = await axios.get(`http://localhost:3003/departs/${id}`)
        setDepart(result.data);
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Edit Department</h2>
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
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Description"
                        name="description"
                        value={description}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-warning px-3 mr-3">Update</button>
                    <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditDepart;