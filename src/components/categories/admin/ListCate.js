import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

const ListCate = () => {
    const [cates, setCates] = useState([]);
    const [message, setMessage] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const [mounted, setMounted] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies();

    // Check role
    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }

            if (cookies.get("roles").some(role => role === "ROLE_QA_MANAGER")) {
                setIsManager(true)
            } else {
                setIsManager(false)
            }
        }
        return () => setMounted(false)
    }, [])

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
        fetch(`http://localhost:8080/category/all?pageNumber=${pageNumber}`, requestOptions)
            .then(response => response.json())
            .then(result => setCates(result))
    }, [pageNumber])

    // Delete item
    const deleteCate = cateId => {
        axios({
            method: "DELETE",
            url: `http://localhost:8080/category/delete/${cateId}`,
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') }
        })
            .then(res => {
                const newListCategory = [...cates]
                const index = cates.findIndex(cate => cate.id === cateId)
                newListCategory.splice(index, 1)
                setCates(newListCategory)
                setMessage(res.data.message)
            })
    }

    // Export CSV File
    const downloadCSV = cateId => {
        axios({
            method: "GET",
            url: `http://localhost:8080/category/download/${cateId}`,
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Report_${new Date().toLocaleDateString()}.zip`);
                document.body.appendChild(link);
                link.click();
            })
    }

    // Handle pagination
    useEffect(() => {
        if ($(".prev")) {
            (function checkPage() {
                pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
            })()
        }
    }, [pageNumber])

    if (isAdmin || isManager) {
        return (
            <div className="list-cate">
                <h3>Category List</h3>
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
                                {(isAdmin || isManager) && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cates.map(cate => (
                                    <tr key={cate.cateId}>
                                        <th scope="row">#{cate.cateId}</th>
                                        <td>{cate.cateName}</td>
                                        <td>{cate.description}</td>
                                        <td>{new Date(cate.createDate).toLocaleDateString()}</td>
                                        <td>{new Date(cate.lastModifyDate).toLocaleDateString()}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-2" to={`/categories/${cate.cateId}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-2" to={`/categories/edit/${cate.cateId}`}>Edit</Link>
                                            <Link className="btn btn-outline-danger mr-2" onClick={() => deleteCate(cate.cateId)} to="/categories">Delete</Link>
                                            <button className="btn btn-warning" onClick={() => downloadCSV(cate.cateId)}>
                                                <i className="fa-solid fa-download mr-2"></i>
                                                Export file
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {message && <p className="alert alert-success">{message}</p>}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item prev" onClick={() => setPageNumber(pageNumber - 1)}>
                            <Link className="page-link" to={`?pageNumber=${pageNumber - 1}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </Link>
                        </li>
                        <li className="page-item next" onClick={() => setPageNumber(pageNumber + 1)}>
                            <Link className="page-link" to={`?pageNumber=${pageNumber + 1}`} aria-label="Previous">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
    return (
        <p className="alert alert-danger">You don't have permission to access this resources!</p>
    )
}

export default ListCate;