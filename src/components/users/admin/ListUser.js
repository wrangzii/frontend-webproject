import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

const ListUser = () => {
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const [mounted, setMounted] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get("token")) {
            if (cookies.get("roles").some(role => role === "ROLE_ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
        return () => setMounted(false)
    }, [])

    const myHeaders = {
        'Authorization': 'Bearer ' + cookies.get('token'),
        'Accept': 'application/json'
    }

    useEffect(() => {
        fetch(`http://localhost:8080/users/all?pageNumber=${pageNumber}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => setUsers(result))
        return () => setMounted(false)
    }, [pageNumber])

    // Delete item
    const deleteUser = userId => {
        axios({
            method: "DELETE",
            url: `http://localhost:8080/users/delete/${userId}`,
            headers: { 'Authorization': 'Bearer ' + cookies.get('token') }
        })
            .then(res => {
                const newListUser = [...users]
                const index = users.findIndex(user => user.id === userId)
                newListUser.splice(index, 1)
                setUsers(newListUser)
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
            <div className="users">
                <h3>User List</h3>
                <Link className="btn btn-outline-dark mb-3" to="/users/add">Add User</Link>
                <div className="overflow-auto">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user.userId}>
                                        <th scope="row">#{user.userId}</th>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.departmentId.departmentName}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-2" to={`/users/${user.userId}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.userId}`}>Edit</Link>
                                            <Link className="btn btn-outline-danger mr-2" onClick={() => deleteUser(user.userId)} to="/users">Delete</Link>
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

export default ListUser;