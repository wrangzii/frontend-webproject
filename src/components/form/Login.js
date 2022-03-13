import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";

const Login = () => {
	const [Username, setUsername] = useState("");
	const [Password, setPassword] = useState("");
	const navigate = useNavigate()
	const $ = document.querySelector.bind(document)

	const handleLogin = () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const raw = JSON.stringify({
			"username": Username,
			"password": Password
		});
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		fetch("http://localhost:8080/login", requestOptions)
			.then(response => {
				if (response.ok) {
					return response.json()
				}

				throw Error(checkError());
			})
			.then(result => {
				const cookies = new Cookies();
				cookies.set('token', result.token, { path: '/' });
				cookies.set('fullName', result.fullName,)
				navigate('/')
				window.location.reload()
			})
			.catch(error => {
				createAlert(error)
			});

		function checkError() {
			let msg = ""
			if ($("input[type=text]").value === "" || $("input[type=password]").value === "") {
				msg = "Not allow blank"
			} else {
				msg = "Wrong information"
			}
			return msg
		}

		function createAlert(message) {
			const alert = document.createElement("p")
			if (!document.querySelector(".alert-danger")) {
				$('h3').after(alert)
			} else {
				$(".alert-danger").remove()
				$('h3').after(alert)
			}

			alert.textContent = message
			alert.setAttribute("class", "alert alert-danger")
		}
	};
	return (
		<div className="authentication container">
			<form className="d-flex flex-column mx-auto">
				<h3><b>Login to your account</b></h3>
				<div className="form-group mb-3">
					<label htmlFor="username" className="mb-2">Username</label>
					<input type="text" name="username" className="form-control" placeholder="Enter username" value={Username} onChange={(e) => {
						setUsername(e.target.value)
					}} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="mb-2">Password</label>
					<input type="password" name="password" className="form-control" placeholder="Password" value={Password} onChange={(e) => {
						setPassword(e.target.value)
					}} />
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