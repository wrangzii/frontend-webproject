import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios"

const ListDepart = () => {
    const [departs, setDeparts] = useState([])
    const [message, setMessage] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [mounted, setMounted] = useState(true)
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies();
    // const navigate = useNavigate()

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
    }, [mounted])

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Accept': 'application/json'
    }

    useEffect(() => {
        fetch(`http://localhost:8080/department/all?pageNumber=${pageNumber}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => setDeparts(result))
        return () => setMounted(false)
    }, [pageNumber])

    // Delete item
    const deleteDepart = departmentId => {
        axios({
            method: "DELETE",
            url: `http://localhost:8080/department/delete/${departmentId}`,
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') }
        })
            .then(res => {
                const newListDepart = [...departs]
                const index = departs.findIndex(depart => depart.id === departmentId)
                newListDepart.splice(index, 1)
                setDeparts(newListDepart)
                setMessage(res.data.message)
            })
    }

    // Handle pagination action
    useEffect(() => {
        (function checkPage() {
            if (pageNumber) pageNumber <= 0 ? $(".prev").classList.add("pe-none") : $(".prev").classList.remove("pe-none")
        })()
        return () => setMounted(false)
    }, [pageNumber])

    if (isAdmin) {
        return (
            <form className="list-depart">
                <h3>Department List</h3>
                <Link className="btn btn-outline-dark mb-3" to="/departments/add">Add Department</Link>
                <div className="overflow-auto">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Department name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                departs.map(depart => (
                                    <tr key={depart.departmentId}>
                                        <th scope="row">#{depart.departmentId}</th>
                                        <td>{depart.departmentName}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-2" to={`/departments/${depart.departmentId}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-2" to={`/departments/edit/${depart.departmentId}`}>Edit</Link>
                                            <button type="button" className="btn btn-outline-danger mr-2" onClick={() => deleteDepart(depart.departmentId)} >Delete</button>
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
            </form>
        );
    }
    return (
        <p className="alert alert-danger">Only <b>Admin</b> can view this content!</p>
    )
}

export default ListDepart;