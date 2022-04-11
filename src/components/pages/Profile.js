import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'

function Profile() {
    const cookies = new Cookies()
    const [roleName, setRoleName] = useState("")
    useEffect(() => {
        if (cookies.get('token')) {
            setRoleName(cookies.get('roles').map(role => (
                <span className='d-block text-danger' key={role}>{role}</span>
            )))
        }
    }, [])

    return (
        <div className="card" style={{ "zIndex": -1 }}>
            <div className="card-body">
                <h3 className="card-title text-info">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Profile information
                </h3>
                <p className="card-text">User ID: #{cookies.get('id')}</p>
                <p className="card-text">Email: {cookies.get('email')}</p>
                <p className="card-text">Username: {cookies.get('username')}</p>
                <p className="card-text">Full name: {cookies.get('fullName')}</p>
                <p className="card-text">Phone number: {cookies.get('phoneNumber')}</p>
                <p className="card-text">Date of birth: {cookies.get('dateOfBirth')}</p>
                <p className="card-text">Role: {roleName}</p>
            </div>
        </div>
    )
}

export default Profile