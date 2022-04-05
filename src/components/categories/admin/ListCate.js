import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListCate = () => {
    const [cates, setCates] = useState([]);
    const [listCate, setListCate] = useState([])
    const [message, setMessage] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [mounted, setMounted] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
                // navigate("/")
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

    useEffect(() => {
        setTimeout(() => {
            [...$$(".alert")].map(item => item.style.display = "none")
        }, 2000)
    }, [listCate])

    const deleteCate = cateId => {
        fetch(`http://localhost:8080/category/delete/${cateId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => {
                setListCate(listCate.filter(cate => id !== cate.cateId))
                setIsDeleted(true)
                setMessage(id.message)
            })
    }

    useEffect(() => {
        (function checkPage() {
            pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
    }, [pageNumber])

    return (
        <div className="list-cate">
            <h3>Category List</h3>
            {isAdmin && <Link className="btn btn-outline-dark mb-3" to="/categories/add">Add Category</Link>}
            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Last Modified</th>
                            {isAdmin && <th>Action</th>}
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
                                    {isAdmin &&
                                        <td>
                                            <>
                                                <Link className="btn btn-primary mr-2" to={`/categories/${cate.cateId}`}>View</Link>
                                                <Link className="btn btn-outline-primary mr-2" to={`/categories/edit/${cate.cateId}`}>Edit</Link>
                                                <Link className="btn btn-outline-danger mr-2" onClick={() => deleteCate(cate.cateId)} to="/categories">Delete</Link>
                                            </>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {isDeleted && <p className="alert alert-success">{message}</p>}
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

export default ListCate;