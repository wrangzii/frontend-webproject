import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Cookies } from 'react-cookie'

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
    const cookies = new Cookies()
    const { id } = useParams()
    const myHeaders = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + cookies.get('token')
    }
    const bodyFormData = new FormData();
    bodyFormData.append("file", files)
    bodyFormData.append("title", title)
    bodyFormData.append("description", description)
    bodyFormData.append("userId", userId)
    bodyFormData.append("cateId", cateId)
    bodyFormData.append("submissionId", submissionId)
    bodyFormData.append("isAnonymous", isAnonymous)

    useEffect(() => {
        axios({
            method: "PUT",
            headers: myHeaders,
            url: `http://localhost:8080/submit_idea/edit/${id}`,
            data: bodyFormData
        })
    }, [])

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
                setUsername(response.data.data.userId.username)
                setCreateDate(response.data.data.createDate)
                setTitle(response.data.data.title)
                setDescription(response.data.data.description)
            })
            .catch(error => console.log(error.response.data.message))
    }, [idea])

    return (
        <div className='edit-idea'>
            <div className="shadow rounded" key={idea.ideaId}>
                <div className="user d-flex align-items-center gap-2 p-3 border-bottom bg-light">
                    <div className="user-image">
                        <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg" alt="" width={60} />
                    </div>
                    <div className="user-info">
                        <p className="user-name fz-20 text-primary fw-bold">{username}</p>
                        <small className="post-date text-muted">{new Date(createDate).toLocaleDateString()}</small>
                    </div>
                </div>
                <div className="status p-3">
                    <h4 className="border-bottom pb-2">{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
            <button className="btn btn-warning float-end mt-3">Update</button>
        </div>
    )
}

export default EditIdea