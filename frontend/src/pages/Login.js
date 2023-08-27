import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
import { motion } from 'framer-motion';
function login() {
    return (
        <div className="container">
            <div className="row">
                <motion.div className="col-md-6" initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 10}}>
                    <img src="images/education-transparent-background-21.png" className="img-fluid" alt="Education Image" height="450px" width="450px" />
                </motion.div>
                <div className="col-md-6">
                    <div className="c1">
                        <h1 className="mb-4">Login</h1>
                        <p className="mb-4">Log in to continue</p>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" name="email"
                                    placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <a className="float-end" >Lost password?</a>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" />
                            </div>
                            <button type="button" className="btn btn-outline-success btn-block">Sign in</button>
                        </form>
                        <p className="mt-3">Not registered? <Link to="/Register">Create Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login