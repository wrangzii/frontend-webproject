import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const ListDepart = () => {

    const [departs, setDepart] = useState([]);

    useEffect(() => {
        loadDeparts();
    }, []);

    const loadDeparts = async () => {
        const result = await axios.get("http://localhost:3003/departs");
        setDepart(result.data);
    }

    const deleteDepart = async id => {
        await axios.delete(`http://localhost:3003/departs/${id}`);
        loadDeparts();
    }

    return (
        <div className="list-depart">

            <Link className="btn btn-outline-dark mb-3" to="/departments/add">Add Department</Link>

            <div className="overflow-auto">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departs.map((depart, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{depart.name}</td>
                                    <td>{depart.description}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`/departments/${depart.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/departments/edit/${depart.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger mr-2" onClick={() => deleteDepart(depart.id)} to="/departments">Delete</Link>
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

export default ListDepart;