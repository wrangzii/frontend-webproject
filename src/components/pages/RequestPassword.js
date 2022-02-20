import React from "react";
import { Link } from 'react-router-dom'

const RequestPassword = () => {
    return (
        <form>
            <input type="email" placeholder="Your email" className="form-control mb-3 w-100" />
            <button className="btn btn-success">Reset Password</button>
            {/* <Link to="/ResetPassword" component></Link> */}
        </form>
    );
}

export default RequestPassword;