import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";
import Alert from "../alert/Alert"

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAlert, setIsAlert] = useState(false)
	const [message, setMessage] = useState("")
	const [className, setClassName] = useState("")
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
				if (result.data.token) {
					cookies.set('token', result.data.token, { path: '/' })
					cookies.set('fullName', result.data.fullName)
					cookies.set('email', result.data.email)
					cookies.set('username', result.data.username)
					cookies.set('id', result.data.id)
					cookies.set('phoneNumber', result.data.phoneNumber)
					cookies.set('dateOfBirth', new Date(result.data.dateOfBirth).toLocaleDateString())
					cookies.set('roles', result.data.roles)
					window.location.reload()
				}
			})
			.catch(error => {
				setIsAlert(true)
				setClassName("alert-danger")
				console.log(error.message);
			})
	};

	return (
		<div className="authentication container">
			<form className="d-flex flex-column mx-auto">
				<h3><b>Login to your account</b></h3>
				<Alert isAlert={isAlert} className={className} message={message} />
				<div className="form-group mb-3">
					<label htmlFor="username" className="mb-2">Username</label>
					<input type="text" name="username" className="form-control" placeholder="Enter username" value={username.trim()} onChange={e => setUsername(e.target.value)} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="mb-2">Password</label>
					<input type="password" name="password" className="form-control" placeholder="Password" value={password.trim()} onChange={e => setPassword(e.target.value)} />
				</div>
				<div className="form-group mb-3 text-left">
					<Link to="/forgot-password">Forgot password?</Link>
				</div>
				<Link to={"/"} onClick={handleLogin} className="btn btn-success">Login</Link>
			</form>
		</div>
	)

}

export default Login;