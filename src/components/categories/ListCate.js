import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const ListCate = () => {

    const [cates, setCate] = useState([]);

    useEffect(() => {
        loadCates();
    }, []);

    const loadCates = async () => {
        const result = await axios.get("http://localhost:3003/cates");
        setCate(result.data);
    }

    const deleteCate = async id => {
        await axios.delete(`http://localhost:3003/cates/${id}`);
        loadCates();
    }

    return (
        <div className="list-cate">

            <Link className="btn btn-outline-dark mb-3" to="/categories/add">Add Category</Link>

            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cates.map((cate, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{cate.name}</td>
                                    <td>{cate.description}</td>
                                    <td>{cate.createDate}</td>
                                    <td>{cate.lastEdit}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/categories/${cate.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/categories/edit/${cate.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteCate(cate.id)} to="/categories">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCate;