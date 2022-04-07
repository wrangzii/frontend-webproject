import React, { useEffect, useState, useRef } from 'react'
import { Cookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Alert from "../alert/Alert"

function AddIdea() {
    const [files, setFiles] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId] = useState(0)
    const [submissionId, setSubmissionId] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [submission, setSubmission] = useState({})
    const [cateId, setCateId] = useState("")
    const [cates, setCates] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [checked, setChecked] = useState(false)
    const [message, setMessage] = useState("")
    const [className, setClassName] = useState("alert-success")
    const [isAlert, setIsAlert] = useState(false)
    const $ = document.querySelector.bind(document)
    const cookies = new Cookies()
    const bodyFormData = new FormData();
    let cate_id = useRef(null)

    bodyFormData.append("file", files)
    bodyFormData.append("title", title)
    bodyFormData.append("description", description)
    bodyFormData.append("userId", userId)
    bodyFormData.append("cateId", cateId)
    bodyFormData.append("submissionId", submissionId)
    bodyFormData.append("isAnonymous", isAnonymous)

    const myHeaders = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + cookies.get('token')
    }
    const { id } = useParams()

    // Get submission
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/submission/${id}`,
            headers: myHeaders,
        })
            .then(response => {
                setSubmission(response.data.data)
            })
    }, [])

    // Assign value to payload
    useEffect(() => {
        setUserId(cookies.get("id"))
        setSubmissionId(submission.submissionId)
    }, [submission])

    const addIdea = () => {
        axios({
            method: "POST",
            url: "http://localhost:8080/submit_idea/add",
            headers: myHeaders,
            data: bodyFormData,
        })
            .then(response => {
                setIsAlert(true)
                setMessage(response.data.message)
                setClassName("alert-success")
            })
            .catch(error => {
                setIsAlert(true)
                setClassName("alert-danger")
                setMessage(error.response.data.message)
            })
    }

    // Get category
    useEffect(() => {
        axios({
            method: "GET",
            headers: myHeaders,
            url: `http://localhost:8080/category/all?pageNumber=${pageNumber}`,
            data: bodyFormData
        })
            .then(response => {
                setCates(response.data)
                setCateId(cate_id.current.value)
            })
            .catch(error => console.log(error))
    }, [pageNumber])

    // isAnonymous
    useEffect(() => {
        setIsAnonymous($("#anonymous").checked ? true : false);
    }, [isAnonymous])

    const handleSubmit = () => {
        checked ? addIdea() : alert("You need to agree with Terms & Condition!")
    }

    const handleSelectFile = (e) => {
        setFiles(e.target.files[0])
    }

    return (
        <div className="idea">
            <div className="card mb-3">
                <div className="card-header">
                    <div className="d-flex align-items-center gap-2">
                        <label htmlFor="">Category:</label>
                        <select className="form-select col-3" name="" id="">
                            {cates.map(cate => (
                                <option key={cate.cateId} ref={cate_id} value={cate.cateId}>{cate.cateName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Submission: {submission.submissionName}</h5>
                    <p className="card-text">Description: {submission.description}</p>
                </div>
            </div>
            <form>
                <div className="idea-contribute">
                    <div className="user d-flex align-items-center gap-2 p-2">
                        <div className="user-image">
                            <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                        </div>
                        <div className="user-info">
                            <p className="user-name fz-20 text-primary fw-bold">{cookies.get("fullName")}(@{cookies.get("username")})</p>
                            <small className="post-email text-muted">{cookies.get("email")}</small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='fw-bold'>Title</label>
                        <input type="text" className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className='fw-bold'>Content</label>
                        <textarea className='w-100 form-control' name="" id="" rows="10" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="file form-group">
                        <label htmlFor="file">Upload your file</label>
                        <input type="file" id='file' className="file form-control" onChange={handleSelectFile} />
                    </div>
                    <div className="d-flex align-items-center pb-2">
                        <input type="checkbox" id="anonymous" className='mr-2' onChange={e => setIsAnonymous(e.target.checked)} />
                        <label className="form-check-label fw-bold text-danger" htmlFor="anonymous">Post as anonymous</label>
                    </div>
                    <div className="term">
                        <input type="checkbox" onChange={() => setChecked(!checked)} id='term' className="file mr-2" value={checked} />
                        <label htmlFor="term">Do you agree <Link to={"/terms-and-condition"}>Terms and Condition</Link>?</label>
                    </div>
                    <Alert isAlert={isAlert} className={className} message={message} />
                    <button type='button' className='btn btn-primary float-end my-3' onClick={handleSubmit}>Post your idea</button>
                </div>
            </form>
        </div>
    )
}

export default AddIdea