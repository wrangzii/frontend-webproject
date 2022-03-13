import { React, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const AddSubmission = () => {
    const [submissionName, setsubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [closureDate, setClosureDate] = useState("");
    const [finalClosureDate, setFinalClosureDate] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const $ = document.querySelector.bind(document)

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
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw Error(checkError())
            })
            .then(result => {
                setMessage(result.message)
                navigate('/submission')
            })
            .catch(error => {
                createAlert(error)
            });

        function checkError() {
            let msg = ""
            if ($("input[type=text]").value === "" || $("input[type=email]").value === "" || $("input[type=number]").value === "") {
                msg = "Not allow blank"
            } else {
                msg = "Submission is exist"
            }
            return msg
        }

        function createAlert(message) {
            const title = $("h3")
            const alert = document.createElement("p")
            if (!$(".alert-danger")) {
                title.after(alert)
            } else {
                $(".alert-danger").remove()
                title.after(alert)
            }

            alert.textContent = message
            alert.setAttribute("class", "alert alert-danger")
        }
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Submission</h3>
            <div className="form-group">
                <label htmlFor="departmentId">Submission</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Submission Name"
                    name="name"
                    value={submissionName.trim()}
                    onChange={(e) => setsubmissionName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Description</label>
                <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Description"
                    name="description"
                    value={description.trim()}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Closure Date</label>
                <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="Enter Closure Date"
                    name="phone"
                    value={closureDate.trim()}
                    onChange={(e) => setClosureDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Final Closure Date</label>
                <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="Enter Final Closure Date"
                    name="phone"
                    value={finalClosureDate.trim()}
                    onChange={(e) => setFinalClosureDate(e.target.value)} />
            </div>
            <div className="form-group text-right">
                <button className="btn btn-primary px-3 mr-3" onClick={addSubmission}>Add Department</button>
                <Link to="/submission" className="btn btn-danger px-3">Cancel</Link>
            </div>
        </div>
    );
}

export default AddSubmission;