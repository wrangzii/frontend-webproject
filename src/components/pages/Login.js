import React from "react";
import ForgotPassword from "./password/ForgotPassword";
import RequestPassword from "./password/RequestPassword";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = () => {
	return (
		<div className="d-flex h-100">
			<div className="col-12 col-md-6 px-3">
				<img src="https://www.kindpng.com/picc/m/47-477746_download-png-poster-background-clipart-desktop-wallpaper-abstract.png" alt="" className="w-100" />
			</div>
			<form className="col-12 col-md-3 px-3 mx-auto d-flex justify-content-center flex-column">
				<h3><b>Login to your account</b></h3>
				<div className="form-group mb-3">
					<label htmlFor="email" className="mb-2">Email address</label>
					<input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="mb-2">Password</label>
					<input type="password" className="form-control" id="password" placeholder="Password" />
				</div>
				<div className="form-group mb-3">
					<ForgotPassword />
					{/* <BrowserRouter> */}
					<Routes>
						<Route path="/request-password" element={<RequestPassword />}></Route>
					</Routes>
					{/* </BrowserRouter> */}
				</div>
				<button type="submit" className="btn btn-success">Submit</button>
			</form>
		</div>
	);
}

export default Login