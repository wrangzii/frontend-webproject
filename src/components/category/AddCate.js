import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const AddCate = () => {

    let navigate = useNavigate();
    const [cate, setCate] = useState({
        name: "",
        description: "",
        createDate: "",
        lastEdit: "",
    });

    const { name, description, createDate } = cate;
    const onInputChange = e => {
        setCate({ ...cate, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3003/cates", cate);
        navigate("/categories");
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Add New Category</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
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
                        placeholder="Enter Description"
                        name="description"
                        value={description}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createDate">Create Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="createDate"
                        value={createDate}
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-primary px-3 mr-3">Add Category</button>
                    <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddCate;