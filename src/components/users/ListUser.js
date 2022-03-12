import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const ListUser = () => {
    const [users, setUsers] = useState([])
    const cookies = new Cookies();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + cookies.get('token'),
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        redirect: 'follow'
    };
    useEffect(() => {
        fetch("http://localhost:8080/users", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => setUsers(result))
            .catch(error => {
                alert(error.message)
            });
    }, [])

    return (
        <div className="users">

            <Link className="btn btn-outline-dark mb-3" to="/users/add">Add User</Link>

            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.department}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteUser(user.id)} to="/users">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUser;