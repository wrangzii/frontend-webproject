import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Alert from "../../alert/Alert";

const EditCate = () => {
    const { id } = useParams();
    const [cateName, setCateName] = useState("")
    const [description, setDescription] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [lastModifyDate, setLastModifyDate] = useState("")
    const [isAlert, setIsAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [className, setClassName] = useState("alert-success");
    const navigate = useNavigate()
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
        fetch(`http://localhost:8080/category/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === '200 OK' || result.status === '201 CREATED') {
                    setClassName("alert-success")
                    setCateName(result.data.cateName)
                    setDescription(result.data.description)
                    setCreateDate(result.data.createDate || "")
                    setLastModifyDate(result.data.lastModifyDate || "")
                } else {
                    setClassName("alert-danger")
                }
            })
    }, [])

    const editCate = () => {

        const raw = JSON.stringify({
            cateName,
            description,
            createDate,
            lastModifyDate
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/category/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "200 OK") {
                    setCateName(result.data.cateName)
                    setClassName("alert-success")
                    setTimeout(() => {
                        navigate('/categories')
                    }, 2000);
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    };

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Category</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <form>
                <div className="form-group">
                    <label htmlFor="cateName">Category Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
                        name="cateName"
                        value={cateName}
                        onChange={e => setCateName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Description"
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createDate">Created Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="createDate"
                        value={createDate}
                        onChange={e => setCreateDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastModifyDate">Last Modified Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        name="lastModifyDate"
                        value={lastModifyDate}
                        onChange={e => setLastModifyDate(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-warning px-3 mr-3" onClick={editCate}>Update</button>
                    <Link to="/categories" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default EditCate;