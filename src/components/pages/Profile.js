import React from 'react'
import { Cookies } from 'react-cookie'

function Profile() {
    const cookies = new Cookies()

    return (
        <div className="card" style={{ "zIndex": -1 }}>
            <div className="card-body">
                <h3 className="card-title">Profile information</h3>
                <p className="card-text">User ID: #{cookies.get('id')}</p>
                <p className="card-text">Email: {cookies.get('email')}</p>
                <p className="card-text">Username: {cookies.get('username')}</p>
                <p className="card-text">Full name: {cookies.get('fullName')}</p>
                <p className="card-text">Phone number: {cookies.get('phoneNumber')}</p>
                <p className="card-text">Date of birth: {cookies.get('dateOfBirth')}</p>
                <p className="card-text">Role: {cookies.get('roles')}</p>
            </div>
        </div>
    )
}

export default Profile