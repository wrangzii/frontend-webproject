import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"username": "",
			"password": ""
		}
	}

	setParams = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	login = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify({
			"username": this.state.username,
			"password": this.state.password
		});
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		fetch("http://localhost:8080/login", requestOptions)
			.then(response => {
				console.log(response);
				if (response.ok) {
					return response.json()
				}

				throw Error(response.status)
			})
			.then(result => {
				console.log(result)
				// localStorage.setItem("token", result.token)
				Cookies.get('token')
				alert("ok")
			})
			.catch(error => {
				console.log('error', error)
				alert("Wrong")
			});
	}

	render() {
		return (
			<div className="authentication container">
				<form className="px-3 mx-auto d-flex justify-content-center flex-column" method="POST">
					<h3><b>Login to your account</b></h3>
					<div className="form-group mb-3">
						<label htmlFor="username" className="mb-2">Username</label>
						<input type="text" name="username" className="form-control" placeholder="Enter username" onChange={this.setParams} />
					</div>
					<div className="form-group mb-3">
						<label htmlFor="password" className="mb-2">Password</label>
						<input type="password" name="password" className="form-control" placeholder="Password" onChange={this.setParams} />
					</div>
					<div className="form-group mb-3 text-right">
						<Link to="/forgot">Forgot password?</Link>
					</div>
					{/* <Button value="Login" color="success" /> */}
					<button type="button" onClick={this.login}>click</button>
				</form>
			</div>
		)
	}
}

// const Login = () => {

// 	// const login = () => {
// 	// 	var myHeaders = new Headers();
// 	// 	myHeaders.append("Content-Type", "application/json");
// 	// 	var raw = JSON.stringify({
// 	// 		"username": "wrangzii",
// 	// 		"password": "12345678"
// 	// 	});
// 	// 	var requestOptions = {
// 	// 		method: 'POST',
// 	// 		headers: myHeaders,
// 	// 		body: raw,
// 	// 		redirect: 'follow'
// 	// 	};
// 	// 	fetch("http://localhost:8080/login", requestOptions)
// 	// 		.then(response => {
// 	// 			console.log(response);
// 	// 			if (response.ok) {
// 	// 				return response.json()
// 	// 			}

// 	// 			throw Error(response.status)
// 	// 		})
// 	// 		.then(result => {
// 	// 			console.log(result)
// 	// 			localStorage.setItem("token", result.token)
// 	// 			alert("ok")
// 	// 		})
// 	// 		.catch(error => {
// 	// 			console.log('error', error)
// 	// 			alert("Wrong")
// 	// 		});
// 	// }

// 	// return (
// 	// 	<div className="authentication container">
// 	// 		<form className="px-3 mx-auto d-flex justify-content-center flex-column" method="POST" onClick={login}>
// 	// 			<h3><b>Login to your account</b></h3>
// 	// 			<div className="form-group mb-3">
// 	// 				<label htmlFor="email" className="mb-2">Email address</label>
// 	// 				<input type="email" className="form-control" placeholder="Enter email" />
// 	// 			</div>
// 	// 			<div className="form-group mb-3">
// 	// 				<label htmlFor="password" className="mb-2">Password</label>
// 	// 				<input type="password" className="form-control" placeholder="Password" />
// 	// 			</div>
// 	// 			<div className="form-group mb-3 text-right">
// 	// 				<Link to="/forgot">Forgot password?</Link>
// 	// 			</div>
// 	// 			<Button value="Login" color="success" />
// 	// 		</form>
// 	// 	</div>
// 	// );
// }

// export default Login