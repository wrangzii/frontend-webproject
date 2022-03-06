import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Cookies } from "react-cookie";
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
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const raw = JSON.stringify({
			"username": this.state.username,
			"password": this.state.password
		});
		const requestOptions = {
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
				const cookies = new Cookies();
				cookies.set('token', result.token, { path: '/' });
			})
			.catch(error => {
				console.log('error', error)
				alert("Wrong")
			});
	}

	render() {
		return (
			<div className="authentication container">
				<form className="d-flex flex-column mx-auto">
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
					<button type="button" onClick={this.login} className="btn btn-success">Login</button>
				</form>
			</div>
		)
	}
}