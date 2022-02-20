import React from "react";
import RequestPassword from "./RequestPassword";
import ForgotPassword from "../ForgotPassword";
import { Routes, Route, Link } from 'react-router-dom';

const Login = () => {
	return (
		<form className="px-3 mx-auto d-flex justify-content-center flex-column">
			<h3><b>Login to your account</b></h3>
			<div className="form-group mb-3">
				<label htmlFor="email" className="mb-2">Email address</label>
				<input type="email" className="form-control" placeholder="Enter email" />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="password" className="mb-2">Password</label>
				<input type="password" className="form-control" placeholder="Password" />
			</div>
			<div className="form-group mb-3 text-right">
				<Link to="/forgot">Forgot password?</Link>
			</div>
			<button type="submit" className="btn btn-success">Submit</button>
		</form>
	);
}

<style>

</style>

export default Login