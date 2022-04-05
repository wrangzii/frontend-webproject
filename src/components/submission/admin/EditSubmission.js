import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import Alert from "../../alert/Alert";

const EditSubmission = () => {
    const { id } = useParams();
    const [submissionName, setsubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [closureDate, setClosureDate] = useState("");
    const [finalClosureDate, setFinalClosureDate] = useState("");
    const [message, setMessage] = useState("")
    const [isAlert, setIsAlert] = useState(false)
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
        fetch(`http://localhost:8080/submission/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === '200 OK' || result.status === "201 CREATED") {
                    setClassName("alert-success")
                    setsubmissionName(result.data.submissionName)
                    setDescription(result.data.description)
                } else {
                    setClassName("alert-danger")
                }
            })
    }, [])

    const editSubmission = () => {

        const raw = JSON.stringify({
            submissionName,
            description,
            closureDate,
            finalClosureDate
        });
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/submission/edit/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message || result.error)
                setIsAlert(true)
                if (result.status === "200 OK" || result.status === "201 CREATED") {
                    setsubmissionName(result.data.submissionName)
                    setClassName("alert-success")
                    setTimeout(() => {
                        navigate('/submission')
                    }, 2000);
                } else {
                    setClassName("alert-danger")
                }
                window.scrollTo(0, 0)
            })
    }
    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Submission</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <form>
                <div className="form-group">
                    <label htmlFor="submissiontName">Submission Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Submission"
                        name="submissiontName"
                        value={submissionName}
                        onChange={e => setsubmissionName(e.target.value)}
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
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="closureDate">Closure Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        placeholder="Enter ClosureDate"
                        name="closureDate"
                        value={closureDate}
                        onChange={e => setClosureDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="finalClosureDate">Final Closure Date</label>
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        placeholder="Enter Final Closure Date"
                        name="finalClosureDate"
                        value={finalClosureDate}
                        onChange={e => setFinalClosureDate(e.target.value)}
                    />
                </div>
                <div className="form-group text-right">
                    <button type="button" className="btn btn-warning px-3 mr-3" onClick={editSubmission}>Update</button>
                    <Link to="/submission" className="btn btn-danger px-3">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
export default EditSubmission;