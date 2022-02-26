import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewCate = () => {

    const [cate, setCate] = useState({
        name: "",
        description: "",
        createDate: "",
        lastEdit: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadCate();
    }, []);

    const loadCate = async () => {
        const res = await axios.get(`http://localhost:3003/cates/${id}`);
        setCate(res.data);
    };

    return (
        <>
            <Link className="btn btn-primary" to="/categories">List Category</Link>
            <h3 className="display-4">Category Id: {id}</h3>
            <hr />
            <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Name: {cate.name}</li>
                <li className="list-group-item text-break">Description: {cate.description}</li>
                <li className="list-group-item text-break">Created Date: {cate.createDate}</li>
                <li className="list-group-item text-break">Last Modified: {cate.department}</li>
            </ul>
        </>
    );
};

export default ViewCate;