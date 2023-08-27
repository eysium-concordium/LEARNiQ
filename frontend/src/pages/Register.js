import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
import { motion } from 'framer-motion'
function Register() {
    return (
        <div class="container">
            <div class="row">
                <motion.div class="col-md-6" initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 10 }}>
                    <img src="images/education-transparent-background-21.png" class="img-fluid" alt="Education Image" height="650px" width="450px" />
                </motion.div>
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