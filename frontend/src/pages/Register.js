import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"

function Register() {
  return (
    <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
            <div class="col-md-6 c2">
                <img src="images/education-transparent-background-21.png" class="img-fluid" alt="Education Image" height="650px" width="450px" />
            </div>
            <div class="col-md-6">
                <div class="c1">
                    <h1 class="mb-4">Sign in</h1>
                    <p class="mb-4" >Sign in to continue</p>
                    <form>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="Enter your full name" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1"
                                placeholder="name@example.com" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="button" class="btn btn-primary btn-block">Sign in</button>
                    </form>
                    <p class="mt-3">Registered? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register