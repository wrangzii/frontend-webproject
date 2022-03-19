import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewCate = () => {
    const { id } = useParams();
    const [cates, setCates] = useState([]);
    const [isMounted, setIsMounted] = useState(true)

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
        if (isMounted) {
            fetch(`http://localhost:8080/category/${id}`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw Error(response.message);
                })
                .then(result => setCates(result.data))
                .catch(error => {
                    alert(error)
                });
        }
        return () => {setIsMounted(false)}
    }, [])

    return (
        <>
            <Link className="btn btn-primary" to="/categories">List Category</Link>
            <h3 className="display-4">Category Id: #{cates.cateId}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0" style={{ "zIndex": -1 }}>
                <li className="list-group-item text-break">Name: {cates.cateName}</li>
                <li className="list-group-item text-break">Description: {cates.description}</li>
                <li className="list-group-item text-break">Created Date: {new Date(cates.createDate).toLocaleDateString()}</li>
                <li className="list-group-item text-break">Last Modified: {new Date(cates.lastModifyDate).toLocaleDateString()}</li>
            </ul>
        </>
    );
};

export default ViewCate;