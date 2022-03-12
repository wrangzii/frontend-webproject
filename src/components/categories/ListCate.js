import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListCate = () => {
    const [isDeleted, setIsDeleted] = useState(false)
    const [cates, setCates] = useState([]);
    const cookies = new Cookies();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies.get('token'),
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };

    useEffect(() => {
        fetch("http://localhost:8080/category/all", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setCates(result))
            .catch(error => {
                alert(error.message)
            });
    }, [isDeleted])

    const deleteCate = (cateId) => {
        fetch(`http://localhost:8080/category/delete/${cateId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
        setIsDeleted(true)
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
                            cates.map(cate => (
                                <tr key={cate.cateId}>
                                    <th scope="row">{cate.cateId}</th>
                                    <td>{cate.cateName}</td>
                                    <td>{cate.description}</td>
                                    <td>{cate.createDate}</td>
                                    <td>{cate.lastModifyDate}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/categories/${cate.cateId}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/categories/edit/${cate.cateId}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteCate(cate.cateId)} to="/categories">Delete</Link>
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