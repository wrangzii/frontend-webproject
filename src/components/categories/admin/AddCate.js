import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/Alert";
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"

const AddCate = () => {
    const [cateName, setCateName] = useState("")
    const [description, setDescription] = useState("")
    // const [createDate, setCreateDate] = useState("")
    const [className, setClassName] = useState("alert-success");
    const [message, setMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const navigate = useNavigate()

    const handleAddCate = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            cateName,
            description,
            // createDate,
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow',
        };
        fetch("http://localhost:8080/category/add", requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "201 CREATED" || result.status === "200 OK") {
                    setClassName("alert-success")
                    setTimeout(() => {
                        navigate('/categories')
                    }, 2000);
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Category</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <form>
                <div className="form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
                        name="name"
                        value={cateName}
                        onChange={(e) => {
                            setCateName(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Description"
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    ></textarea>
                </div>
                {/* <div className="form-group d-none">
                    <label htmlFor="createDate">Create Date</label>
                    <DatePicker
                        className="form-control form-control-lg"
                        selected={createDate}
                        value={new Date().toISOString().slice(0, 10) }
                        onChange={date => setCreateDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                    />
                </div> */}
                <div className="form-group form-group d-flex justify-content-end gap-3 flex-wrap">
                    <button type="button" className="btn btn-primary col-12 col-sm-auto" onClick={handleAddCate}>Add Category</button>
                    <Link to="/categories" className="btn btn-danger col-12 col-sm-auto">Cancel</Link>
                </div>
            </form>
        </div>
    );
}


export default AddCate;