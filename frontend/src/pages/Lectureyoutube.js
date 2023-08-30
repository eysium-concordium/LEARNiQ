import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Lectureyoutubecss.css'
export default function Lectureyoutube() {
  return (
    <>
      <div className="container">
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <motion.div className="row" whileHover={{ scale: 1.1 }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbFCURuJZr0pVpmhA6OPAAfFbolJdPVRix2EZbhWraF4rCfzWwiiWYpcnXsJTd-AimoII&usqp=CAU" className="imy1"></img>
              </motion.div>
              <br></br>
              <div className="row">
                <span className="lectextt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae dolorem sapiente aspernatur omnis labore, ratione qui quibusdam error perferendis quod iste quae blanditiis harum quaerat quis beatae atque quas!
                </span>
              </div>
            </div>
            <div className="col-sm-2">

            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="wrapper">
                  <div className="searchBar">
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" style={{ color: 'whitesmoke' }} />
                    <Link to='/Lectureyoutube'> <motion.button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" whileHover={{ scale: 1.5 }}>
                      <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24"><path fill="whitesmoke" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                      </svg>
                    </motion.button></Link>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-sm-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                  </div>
                </div>
                <div className="col-sm-11">
                  <div className="row">
                    <div className="col-sm-6">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9szzpLIC9m0cBUn_F7Ug1RsVhiuLciaUK2EWGLpA47BGGy_LhnA767yylXIN0ki6101s&usqp=CAU" className="imy2"></img>
                    </div>
                    <div className="col-sm-6">
                      <span className="lectext">Lorem ipsum dolor sit amet consectetur</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                  </div>
                </div>
                <div className="col-sm-11">
                  <div className="row">
                    <div className="col-sm-6">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9szzpLIC9m0cBUn_F7Ug1RsVhiuLciaUK2EWGLpA47BGGy_LhnA767yylXIN0ki6101s&usqp=CAU" className="imy2"></img>
                    </div>
                    <div className="col-sm-6">
                      <span className="lectext">Lorem ipsum dolor sit amet consectetur</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                  </div>
                </div>
                <div className="col-sm-11">
                  <div className="row">
                    <div className="col-sm-6">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9szzpLIC9m0cBUn_F7Ug1RsVhiuLciaUK2EWGLpA47BGGy_LhnA767yylXIN0ki6101s&usqp=CAU" className="imy2"></img>
                    </div>
                    <div className="col-sm-6">
                      <span className="lectext">Lorem ipsum dolor sit amet consectetur</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                  </div>
                </div>
                <div className="col-sm-11">
                  <div className="row">
                    <div className="col-sm-6">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9szzpLIC9m0cBUn_F7Ug1RsVhiuLciaUK2EWGLpA47BGGy_LhnA767yylXIN0ki6101s&usqp=CAU" className="imy2"></img>
                    </div>
                    <div className="col-sm-6">
                      <span className="lectext">Lorem ipsum dolor sit amet consectetur</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
