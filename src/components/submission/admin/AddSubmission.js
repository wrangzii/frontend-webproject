import { React, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../alert/Alert";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const AddSubmission = () => {
    const [submissionName, setsubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [closureDate, setClosureDate] = useState("");
    const [finalClosureDate, setFinalClosureDate] = useState("");
    const [message, setMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [className, setClassName] = useState("alert-success");
    const navigate = useNavigate()

    const addSubmission = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            submissionName,
            description,
            closureDate,
            finalClosureDate
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:8080/submission/add", requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(result.message)
                setIsAlert(true)
                if (result.status === "201 CREATED") {
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
            <h3 className="text-center mb-4">Add New Submission</h3>
            <Alert isAlert={isAlert} className={className} message={message} />
            <div className="form-group">
                <label htmlFor="departmentId">Submission</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Submission Name"
                    name="name"
                    value={submissionName}
                    onChange={(e) => setsubmissionName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Description</label>
                <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="closureDate">Closure Date</label>
                <DatePicker
                    className="form-control form-control-lg"
                    selected={closureDate}
                    value={closureDate}
                    onChange={date => setClosureDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                />
            </div>
            <div className="form-group">
                <label htmlFor="finalClosureDate">Final Closure Date</label>
                <DatePicker
                    className="form-control form-control-lg"
                    selected={finalClosureDate}
                    value={finalClosureDate}
                    onChange={date => setFinalClosureDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={closureDate}
                />
            </div>
            <div className="form-group text-right">
                <button className="btn btn-primary px-3 mr-3" onClick={addSubmission}>Add Department</button>
                <Link to="/submission" className="btn btn-danger px-3">Cancel</Link>
            </div>
        </div>
    );
}

export default AddSubmission;