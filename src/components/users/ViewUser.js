import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        role: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(res.data);
    };

    return (
        <>
            <Link className="btn btn-primary" to="/users">List User</Link>
            <h3 className="display-4">User Id: {id}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Role: {user.role}</li>
                <li className="list-group-item text-break">Department: {user.department}</li>
                <li className="list-group-item text-break">Name: {user.name}</li>
                <li className="list-group-item text-break">Email: {user.email}</li>
                <li className="list-group-item text-break">Phone: {user.phone}</li>
            </ul>
        </>
    );
};

export default ViewUser;