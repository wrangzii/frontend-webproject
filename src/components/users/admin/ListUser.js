import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListUser = () => {
    const [users, setUsers] = useState([])
    const [listUser, setListUser] = useState([])
    const navigate = useNavigate()
    const $ = document.querySelector.bind(document)

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
        fetch("http://localhost:8080/users/all", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => {
                setUsers(result)
                alertSuccess(result.message)
            })
            .catch(error => {
                navigate('/login')
            });
    }, [listUser])

    function alertSuccess(msg) {
        return `
            ${msg}
        `
    }

    const deleteUser = userId => {
        fetch(`http://localhost:8080/users/delete/${userId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(id => {
                setListUser(listUser.filter(user => id !== user.userId))
                // Alert success notification
                const div = $(".overflow-auto")
                const alert = document.createElement('p')
                alert.setAttribute("class", "alert alert-success mt-3")
                alert.textContent = id.message
                div.after(alert)
            })

        setTimeout(() => {
            $(".alert").style.display = "none"
        }, 2000)
    }

    return (
        <div className="users">
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
            </div>
        </div>
    );
}

export default ListUser;