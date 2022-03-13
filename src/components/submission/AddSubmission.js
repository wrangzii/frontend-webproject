import { React, useState } from "react";
import "../submission/Submit.css";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

const AddSubmission = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const $ = document.querySelector.bind(document)

    const addSubmission = () => {
        const cookies = new Cookies();

        const raw = JSON.stringify({
            name,
            email,
            phone
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
                console.log(result);
                setMessage(result.message)
                // navigate('/departments')
            })
            .catch(error => {
                createAlert(error)
            });

        function checkError() {
            let msg = ""
            if ($("input[type=text]").value === "" || $("input[type=email]").value === "" || $("input[type=number]").value === "") {
                msg = "Not allow blank"
            } else {
                msg = "User name is exist"
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
        // <div className="submit">
        //     <form >
        //         <input
        //             type="text"
        //             value={name}
        //             placeholder="Name"
        //             onChange={(e) => setName(e.target.value)} />

        //         <input
        //             type="email"
        //             value={email}
        //             placeholder="Email"
        //             onChange={(e) => setEmail(e.target.value)} />

        //         <input
        //             type="number"
        //             value={phone}
        //             placeholder="Phone Number"
        //             onChange={(e) => setPhone(e.target.value)} />

        //         <button type="button" onClick={handleSubmit}>Submit</button>

        //         <div className=" alert-success">{message ? <p>{message}</p> : null}</div>
        //     </form>
        // </div>
        <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
            <h3 className="text-center mb-4">Add New Submission</h3>
            <div className="form-group">
                <label htmlFor="departmentId">Submission</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Submission Name"
                    name="name"
                    value={name.trim()}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Email</label>
                <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Email"
                    name="email"
                    value={email.trim()}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="departmentId">Phone No.</label>
                <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Phone No."
                    name="phone"
                    value={phone.trim()}
                    onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group text-right">
                <button className="btn btn-primary px-3 mr-3" onClick={addSubmission}>Add Department</button>
                <Link to="/submission" className="btn btn-danger px-3">Cancel</Link>
            </div>
        </div>
    );
}

export default AddSubmission;