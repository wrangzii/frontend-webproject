import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListCate = () => {
    const [cates, setCates] = useState([]);
    const [listCate, setListCate] = useState([])
    const navigate = useNavigate()
    const cookies = new Cookies();
    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Content-Type': 'application/json'
    }

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
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
                navigate('/')
            });
    }, [listCate])

    const deleteCate = cateId => {
        fetch(`http://localhost:8080/category/delete/${cateId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => setListCate(listCate.filter(cate => id !== cate.cateId)))
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
                                    <th scope="row">#{cate.cateId}</th>
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