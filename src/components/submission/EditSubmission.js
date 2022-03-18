import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

const EditSubmission = () => {
    const { id } = useParams();
    const [submissionName, setsubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [closureDate, setClosureDate] = useState("");
    const [finalClosureDate, setFinalClosureDate] = useState("");
    // const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const editSubmission = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            submissionName,
            description,
            closureDate,
            finalClosureDate
        });
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/submission/edit/${id}`, requestOptions)
            .then(response => {
                if (response.ok)
                    response.json()
                throw Error(checkError())
            })
            .then(result => {
                // setMessage(result.message)
                console.log(result);
                navigate('/submission')
            })
            .catch(error => createAlert(error))

    }

    function checkError() {
        let msg = ""
        if (document.querySelector("input[type=text]").value === "") {
            msg = "Not allow blank"
        } else {
            msg = "Submission name is exist"
        }
        return msg
    }

    function createAlert(message) {
        const title = document.querySelector("h3")
        const alert = document.createElement("p")
        if (!document.querySelector(".alert-danger")) {
            title.after(alert)
        } else {
            document.querySelector(".alert-danger").remove()
            title.after(alert)
        }

        alert.textContent = message
        alert.setAttribute("class", "alert alert-danger")
    }

    return (
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Edit Submission</h3>
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