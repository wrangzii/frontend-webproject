import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import Alert from '../alert/Alert'

function EditIdea() {
    const [files, setFiles] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId] = useState(0)
    const [username, setUsername] = useState("")
    const [submissionId, setSubmissionId] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [cateId, setCateId] = useState("")
    const [idea, setIdea] = useState({})
    const [createDate, setCreateDate] = useState("")
    const [cates, setCates] = useState({})
    const [submissions, setSubmissions] = useState({})
    const [checked, setChecked] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [className, setClassName] = useState("alert-success")
    const [message, setMessage] = useState("")
    const cookies = new Cookies()
    const { id } = useParams()
    const myHeaders = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + cookies.get('token')
    }

    // Handle edit idea
    const editIdea = () => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", files)
        bodyFormData.append("title", title)
        bodyFormData.append("description", description)
        bodyFormData.append("userId", userId)
        bodyFormData.append("cateId", cateId)
        bodyFormData.append("submissionId", submissionId)
        bodyFormData.append("isAnonymous", isAnonymous)

        axios({
            method: "PUT",
            headers: myHeaders,
            url: `http://localhost:8080/submit_idea/edit/${id}`,
            data: bodyFormData
        })
            .then(response => {
                setIsAlert(true)
                setClassName("alert-success")
                setMessage(response.data.message)
            })
            .catch(error => {
                setIsAlert(true)
                setClassName("alert-danger")
                setMessage(error.response.data.error)
            })
    }

    // Get idea
    useEffect(() => {
        axios({
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + cookies.get('token')
            },
            url: `http://localhost:8080/submit_idea/${id}`
        })
            .then(response => {
                console.log(response);
                setUsername(response.data.data.userId.username)
                setCreateDate(response.data.data.createDate)
                setTitle(response.data.data.title)
                setDescription(response.data.data.description)
                setIsAnonymous(response.data.data.isAnonymous)
                setCateId(response.data.data.cateId.cateId)
                setSubmissionId(response.data.data.submissionId.submissionId)
                setUserId(response.data.data.userId.userId)
                setCates(response.data.data.cateId)
                setSubmissions(response.data.data.submissionId)
            })
            .catch(error => console.log(error.response.data.message))
    }, [idea])

    const handleSubmit = () => {
        checked ? editIdea() : alert("You need to agree with Terms & Condition!")
    }

    const handleSelectFile = (e) => {
        setFiles(e.target.files[0])
    }

    return (
        <div className='edit-idea'>
            <div className="card mb-3">
                <div className="card-header">
                    <div className="d-flex align-items-center gap-2">
                        <p>Category: {cates.cateName}</p>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Submission: {submissions.submissionName}</h5>
                    <p className="card-text">Description: {submissions.description}</p>
                </div>
            </div>
            <div className="shadow rounded my-3" key={idea.ideaId}>
                <div className="user d-flex align-items-center justify-content-between p-3 border-bottom bg-light">
                    <div className="d-flex align-items-center gap-2">
                        <div className="user-image">
                            <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                        </div>
                        <div className="user-info">
                            <p className="user-name fz-20 text-primary fw-bold">{username}</p>
                            <small className="post-date text-muted">{new Date(createDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div className='idea-info'>
                        <p className='text-right'><b>Closure Date:</b> {new Date(submissions.closureDate).toLocaleDateString()}</p>
                        <p className='text-right'><b>Final Closure Date:</b> {new Date(submissions.finalClosureDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="status p-3">
                    <h4 className="pb-2">
                        <input type="text" placeholder='Your title' className='form-control fw-bold' value={title} onChange={e => setTitle(e.target.value)} />
                    </h4>
                    <p className='pb-2'>
                        <textarea type="text" placeholder='Your content' className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
                    </p>
                    <div className="file form-group">
                        <label htmlFor="file">Upload your file</label>
                        <input type="file" id='file' className="file form-control" onChange={handleSelectFile} />
                    </div>
                    <div className="d-flex align-items-center py-2">
                        <input type="checkbox" id="anonymous" className='mr-2' checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
                        <label className="form-check-label fw-bold text-danger" htmlFor="anonymous">Post as anonymous</label>
                    </div>
                    <div className="term">
                        <input type="checkbox" onChange={() => setChecked(!checked)} id='term' className="file mr-2" value={checked} />
                        <label htmlFor="term">Do you agree <Link to={"/terms-and-condition"}>Terms and Condition</Link>?</label>
                    </div>
                </div>
            </div>
            <Alert isAlert={isAlert} className={className} message={message} />
            <div className="d-flex gap-2 justify-content-end">
                <button className="btn btn-warning" onClick={handleSubmit}>
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Update
                </button>
                <Link to={`/${id}`} className="btn btn-danger">Cancel</Link>
            </div>
        </div>
    )
}

export default EditIdea