import React from 'react'
import "./Navbar.css";



function Navbar() {
  return (
    <div className="container-fluid">
    <div className="row" >
        <div className="col-sm-7">
            <img src="images/logo.png" height="55px" width="55px"
                 />
            <text >LEARNiQ</text>
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
                    <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
                </ul>
                <button type="button" className="btn btn-primary"><text
                        >Logout</text></button>
            </nav>
        </div>
    </div>
</div>

  )
}

export default Navbar