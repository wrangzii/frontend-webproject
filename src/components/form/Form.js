import React from "react";
//Form
import Login from './Login';
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword';
import { Routes, Route } from "react-router-dom";

const Form = () => {
    return (
        <div className="authentication container">
            <form className="p-5 shadow rounded mx-auto d-flex justify-content-center flex-column">
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/forgot' element={<ForgotPassword />} />
                    <Route path='/reset' element={<ResetPassword />} />
                </Routes>
            </form>
        </div>
    );
}

export default Form;