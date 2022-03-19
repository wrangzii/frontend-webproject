import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAlert, setIsAlert] = useState(false)
	const [message, setMessage] = useState("")
	const navigate = useNavigate()
	const cookies = new Cookies();

	const handleLogin = () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json")

		const raw = JSON.stringify({
			username,
			password
		});
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://localhost:8080/login", requestOptions)
			.then(response => {
				return response.json()
			})
			.then(result => {
				setMessage(result.message || result.error)
				setIsAlert(true)
				if (result.token) {
					cookies.set('token', result.token, { path: '/' })
					cookies.set('fullName', result.fullName)
					cookies.set('email', result.email)
					cookies.set('username', result.username)
					cookies.set('id', result.id)
					cookies.set('phoneNumber', result.phoneNumber)
					cookies.set('dateOfBirth', new Date(result.dateOfBirth).toLocaleDateString())
					cookies.set('roles', result.roles)
					navigate('/')
					window.location.reload()
				}
			})
	};

	return (
		<div className="authentication container">
			<form className="d-flex flex-column mx-auto">
				<h3><b>Login to your account</b></h3>
				{isAlert && <p className="alert alert-danger">{message}</p>}
				<div className="form-group mb-3">
					<label htmlFor="username" className="mb-2">Username</label>
					<input type="text" name="username" className="form-control" placeholder="Enter username" value={username.trim()} onChange={e => setUsername(e.target.value)} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="mb-2">Password</label>
					<input type="password" name="password" className="form-control" placeholder="Password" value={password.trim()} onChange={e => setPassword(e.target.value)} />
				</div>
				<div className="form-group mb-3 text-right">
					<Link to="/forgot-password">Forgot password?</Link>
				</div>
				<button type="button" onClick={handleLogin} className="btn btn-success">Login</button>
			</form>
		</div>
	)
}

export default Login;