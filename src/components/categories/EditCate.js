import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const EditCate = () => {
    const [cateName, setCateName] = useState("")
    const [description, setDescription] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [lastModifyDate, setLastModifyDate] = useState("")
    const [cateId, setCateId] = useState(1)
    const [cate, setCate] = useState({})
    const cookies = new Cookies();

    const raw = JSON.stringify({
        cateName,
        description,
        createDate,
        lastModifyDate,
    });
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + cookies.get('token'),
            'Content-Type': 'application/json'
        },
        body: raw,
    };

    fetch(`http://localhost:8080/category/edit/${cateId}`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then(result => setCateId(cateId))

    const editCate = cateId => {
        // setCateId(cateId.filter(id => ))
    }


    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h2 className="text-center mb-4">Edit Category</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
                        name="name"
                        value={cate.cateName}
                    // onChange={e => setCateName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Description"
                        name="description"
                        value={cate.description}
                    // onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createDate">Create Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="createDate"
                        value={cate.createDate}
                    // onChange={e => setCreateDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastModify">Last Modified</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="lastEdit"
                        value={cate.lastModifyDate}
                    // readOnly
                    // onChange={e => setLastModifyDate(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-warning px-3 mr-3" onClick={editCate(cateId)}>Update</button>
                    <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditCate;