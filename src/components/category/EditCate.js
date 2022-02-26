import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

const EditCate = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [cate, setCate] = useState({
        name: "",
        description: "",
        createDate: "",
        lastEdit: "",
    });

    const { name, description, createDate, lastEdit } = cate;
    const onInputChange = e => {
        setCate({ ...cate, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadCate();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/cates/${id}`, cate);
        navigate("/categories");
    };

    const loadCate = async () => {
        const result = await axios.get(`http://localhost:3003/cates/${id}`)
        setCate(result.data);
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-2 p-md-5">
            <h2 className="text-center mb-4">Edit Category</h2>
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
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Description"
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
                <div className="form-group">
                    <label htmlFor="lastModify">Last Modified</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="lastEdit"
                        value={lastEdit}
                        readOnly
                        onChange={e => onInputChange(e)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-warning px-3 mr-3">Update</button>
                    <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditCate;