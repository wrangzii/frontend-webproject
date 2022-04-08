import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewUser = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([])

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
        fetch(`http://localhost:8080/users/${id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.message);
            })
            .then(result => {
                setUsers(result.data)
                setRoles(result.data.roles.map(role => (
                    <span className="d-block text-danger" key={role.roleId}>{role.roleName}</span>
                )))
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    return (
        <>
            <Link className="btn btn-primary" to="/users">List User</Link>
            <h3 className="display-4">User Id: {users.userId}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0" style={{ "zIndex": -1 }}>
                <li className="list-group-item text-break">Email: {users.email}</li>
                <li className="list-group-item text-break">Username: {users.username}</li>
                <li className="list-group-item text-break">Fullname: {users.fullName}</li>
                <li className="list-group-item text-break">Phone: {users.phoneNumber}</li>
                <li className="list-group-item text-break">Date Of Birth: {new Date(users.dateOfBirth).toLocaleDateString()}</li>
                <li className="list-group-item text-break">Role: {roles}</li>
            </ul>
        </>
    );
};

export default ViewUser;