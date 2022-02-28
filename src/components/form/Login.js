import React from "react";
import Button from "./Button";

import { Link } from 'react-router-dom';

const Login = () => {
	const handleSubmit = e => e.preventDefault()

	return (
		<div className="authentication container">
			<form className="px-3 mx-auto d-flex justify-content-center flex-column" onSubmit={handleSubmit}>
				<h3><b>Login to your account</b></h3>
				<div className="form-group mb-3">
					<label htmlFor="email" className="mb-2">Email address</label>
					<input type="email" className="form-control" placeholder="Enter email" onChange={e => this.email = e.target.value} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="mb-2">Password</label>
					<input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value} />
				</div>
				<div className="form-group mb-3 text-right">
					<Link to="/forgot">Forgot password?</Link>
				</div>
				<Button value="Login" color="success" />
			</form>
		</div>
	);
}

export default Login