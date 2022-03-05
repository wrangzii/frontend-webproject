import React from "react";
import Button from "./Button";

const ResetPassword = () => {
    return (
        <div className="authentication container">
            <form className="d-flex flex-column mx-auto">
                <h3><b>Reset password</b></h3>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="mb-2">New password</label>
                    <input type="password" className="form-control" placeholder="New password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="mb-2">Confirm new password</label>
                    <input type="password" className="form-control" placeholder="Confirm new password" />
                </div>
                <Button value="Reset password" color="success" />
            </form>
        </div>
    );
}

export default ResetPassword;