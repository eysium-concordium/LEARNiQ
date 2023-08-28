import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className="container-fluid cont1">
    <div className="row" >
        <div className="col-sm-7">
            <img src="images/logo.png" height="55px" width="55px"/>
            <span className="sp"> LEARNiQ</span>
        </div>
        <div className="col-sm-5">
            <nav className="navbar" >
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#">Quiz</a></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/Dashboard"><a className="nav-link" >Dashboard</a></Link></li>
                </ul>
                <button type="button" className="btn btn-outline-success"><span
                        >Logout</span></button>
            </nav>
        </div>
    </div>
</div>

  )
}

export default Navbar