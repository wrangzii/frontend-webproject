import React from "react";
import { Link } from 'react-router-dom'
const RequestPassword = () => {
    return (
        <form action="">
            <input type="email" placeholder="Your email" />
            <button className="btn btn-success">Reset Password</button>
            <Link to="/ResetPassword" component></Link>
        </form>
    );
}

export default RequestPassword;