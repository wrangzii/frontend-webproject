import React, {useEffect} from "react";
import Button from "./Button";

const ResetPassword = () => {
    const requestOptions = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };

    // useEffect(() => {
    //     fetch("http://localhost:8080/confirm_reset?token=103b2f6f-f128-4612-bcee-110a4a71d1cf", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result);
    //         })
    // }, [])

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