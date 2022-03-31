import React from 'react'
import { Link } from 'react-router-dom';

const ListIdea = () => {
    return (
        <div className="list-idea">
            <Link className="btn btn-outline-dark mb-3" to="/departments/add">Add Idea</Link>
                <div className="overflow-auto">
                    <table className="table border shadow">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Content</th>
                                <th scope="col">Views</th>
                                <th scope="col">Category</th>
                                <th scope="col">Submission</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Last Modified Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                departs.map(depart => (
                                    <tr key={depart.departmentId}>
                                        <th scope="row">#{depart.departmentId}</th>
                                        <td>{depart.departmentName}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-2" to={`/departments/${depart.departmentId}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-2" to={`/departments/edit/${depart.departmentId}`}>Edit</Link>
                                            <Link className="btn btn-outline-danger mr-2" onClick={() => deleteDepart(depart.departmentId)} to="/departments">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            } */}
                        </tbody>
                    </table>
                    {/* {isDeleted && <p className="alert alert-success">{message}</p>} */}
                </div>
        </div>
    )
}

export default ListIdea;