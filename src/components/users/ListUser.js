import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const ListUser = () => {

    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUser(result.data);
    }

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    }

    return (
        <div className="list-user">

            <Link className="btn btn-outline-dark mb-3" to="/list-user/add">Add User</Link>

            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">UseName</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/list-user/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/list-user/edit/${user.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteUser(user.id)} to="/list-user">Delete</Link>
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