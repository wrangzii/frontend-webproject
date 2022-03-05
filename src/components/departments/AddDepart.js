import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default class AddDepart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": "",
            "description": ""
        }
    }

    setParams = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    AddDepart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": this.state.username,
            "description": this.state.description
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(requestOptions);
        fetch("http://localhost:8080/department/add", requestOptions)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }

                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("token", result.token)
                console.log(result.username)
                alert(localStorage.getItem('token'))
                axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')
            })
            .catch(error => {
                console.log('error', error)
                alert("Wrong")
            });
    }
    render() {
        return (
            <>
            <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
                <h2 className="text-center mb-4">Add New Department</h2>
                
                <div className="form-group">
                    <label htmlFor="departmentId">Department Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Department Name"
                            name="name"
                            value={this.name}
                            onChange={this.setParams}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Description"
                            name="description"
                            value={this.description}
                            onChange={this.setParams}
                        />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-primary px-3 mr-3" onClick={this.AddDepart}>Add Department</button>
                    <Link to="/department" className="btn btn-danger px-3">Cancel</Link>
                </div>                
            </div>          
            </>
        )
    }
}

// import React, { useState } from "react";
// import axios from "axios";

// import { Link, useNavigate } from "react-router-dom";

// const AddDepart = () => {

//     let navigate = useNavigate();
//     const [depart, setDepart] = useState({
//         name: "",
//         description: "",
//     });

//     const { name, description } = depart;
//     const onInputChange = e => {
//         setDepart({ ...depart, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();
//         await axios.post("http://localhost:8080/department/add", depart);
//         navigate("/departments");
//     };

//     return (
//         <div className="col-12 col-md-9 col-lg-6 mx-auto shadow p-3 p-md-5">
//             <h2 className="text-center mb-4">Add New Department</h2>
//             <form onSubmit={e => onSubmit(e)}>
//                 <div className="form-group">
//                     <label htmlFor="department-name">Department Name</label>
//                     <input
//                         type="text"
//                         className="form-control form-control-lg"
//                         placeholder="Enter Department"
//                         name="name"
//                         value={name}
//                         onChange={e => onInputChange(e)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="description">Description</label>
//                     <textarea
//                         type="text"
//                         className="form-control form-control-lg"
//                         placeholder="Enter Description"
//                         name="description"
//                         value={description}
//                         onChange={e => onInputChange(e)}
//                     />
//                 </div>
//                 <div className="form-group text-right">
//                     <button className="btn btn-primary px-3 mr-3">Add Department</button>
//                     <Link to="/departments" className="btn btn-danger px-3">Cancel</Link>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddDepart;