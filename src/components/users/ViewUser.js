import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
   
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await axios.get(`http://localhost:3003/users/${id}`);
        setUser(res.data);
    };

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/listuser">List User</Link>
        <h1 className="display-4">User Id: {id}</h1>
        <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">name: {user.name}</li>
                <li className="list-group-item">user name: {user.username}</li>
                <li className="list-group-item">email: {user.email}</li>
                <li className="list-group-item">phone: {user.phone}</li>
            </ul>
        </div>
    );
};

export default ViewUser;