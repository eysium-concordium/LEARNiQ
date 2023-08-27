//import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import "./Dashboard.css"
const pdata = [
    {
        name: 'Monday',
        time: 5
    },
    {
        name: 'Tuesday',
        time: 6
    },
    {
        name: 'Wednesday',
        time: 4
    },
    {
        name: 'Thursday',
        time: 9
    },
    {
        name: 'Friday',
        time: 8
    },
    {
        name: 'Saturday',
        time: 10

    },
    {
        name: 'Sunday',
        time: 5.6

    }
]
const percentage = 75;
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5,
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};
export default function Dashboardfinal() {
    const [style1, setstyle1] = useState({
        color: 'gold',
    });
    return (
        <motion.div variants={container} initial="hidden"
            animate="visible">
            <motion.div className="container cmain">
                <motion.div className="row item" variants={item}>
                    <div className="container d2">
                        <div className="row">
                            <div className="col"> <span className="t1">Dash</span><span className="t2">board</span></div>
                        </div>
                        <div className="row c2">
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col">
                                        <span className="t3">Hello! </span><span className="t4">Martin</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="t5">Welcome to </span><span className="t6">LEARNiQ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">

                            </div>
                        </div>
                    </div>
                </motion.div>
                <br></br>
                <div className="row">
                    <motion.div className="col-sm-4 r3 item" variants={item}>
                        <motion.span className="sp2" initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}>Progress</motion.span>
                        <motion.div className="progress-container" whileHover={{ scale: 1.1 }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    textColor: 'whitesmoke',
                                    pathColor: `#974EC3`,
                                    trailColor: '#d6d6d6',
                                })}
                                className="circular-progressbar"
                            />
                        </motion.div>
                    </motion.div>
                    <div className="col-sm-1">

                    </div>
                    <motion.div className="col-sm-7 r3 item" variants={item} whileHover={{ scale: 1.1 }}>
                        <span className="sp1">My Activity</span>
                        <br></br>
                        <br></br>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={pdata}>
                                <CartesianGrid stroke="gray" strokeDasharray="3 3" />
                                <XAxis dataKey='name' interval={'preserveStartEnd'} stroke="whitesmoke" />
                                <Tooltip contentStyle={{ backgroundColor: 'whitesmoke' }} />
                                <YAxis stroke="whitesmoke" />
                                <Legend />
                                <Line type="monotone" dataKey="time" stroke="#974EC3" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
                <br></br>
                <div className="row">
                    <motion.div className="col-sm-4 r4 item" variants={item}>
                        <span className="sp2">My Courses</span>
                        <br></br>
                        <br></br>
                        <div className="row">
                            <div className="col-sm-2">
                                <motion.img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5C0m6GOFHow3NJ6AyIDnXhOquFmboxQD4OnoB9yRUucaXPHxyjrfArER_xSzd75Fo5U&usqp=CAU" className="rounded-circle img1" whileHover={{ scale: 1.5 }}></motion.img>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="https://static.vecteezy.com/system/resources/previews/013/166/217/original/3d-visual-of-the-five-5-star-sign-star-rating-icon-symbol-for-pictogram-apps-website-or-graphic-design-element-illustration-of-the-rating-0-5-star-format-png.png" className="img2 rounded-circle"></img><span className="sp2">4.3/5</span>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-outline-success">View</button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-sm-2">
                                <motion.img src="https://www.clipartmax.com/png/middle/351-3515666_c-language-global-or-external-variables-with-examples-c-programming-logo.png" className="rounded-circle img1" whileHover={{ scale: 1.5 }}></motion.img>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '55%' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="https://static.vecteezy.com/system/resources/previews/013/166/217/original/3d-visual-of-the-five-5-star-sign-star-rating-icon-symbol-for-pictogram-apps-website-or-graphic-design-element-illustration-of-the-rating-0-5-star-format-png.png" className="img2 rounded-circle"></img><span className="sp2">4.3/5</span>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-outline-success">View</button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-sm-2">
                                <motion.img src="https://w7.pngwing.com/pngs/277/62/png-transparent-python-javascript-clojure-programming-language-programming-miscellaneous-angle-text.png" className="rounded-circle img1" whileHover={{ scale: 1.5 }}></motion.img>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="https://static.vecteezy.com/system/resources/previews/013/166/217/original/3d-visual-of-the-five-5-star-sign-star-rating-icon-symbol-for-pictogram-apps-website-or-graphic-design-element-illustration-of-the-rating-0-5-star-format-png.png" className="img2 rounded-circle"></img><span className="sp2">4.4/5</span>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-outline-success">View</button>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-sm-2">
                                <motion.img src="https://w7.pngwing.com/pngs/203/918/png-transparent-computer-programming-programming-language-design-text-logo-computer-programming.png" className="rounded-circle img1" whileHover={{ scale: 1.5 }}></motion.img>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '90%' }}></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="https://static.vecteezy.com/system/resources/previews/013/166/217/original/3d-visual-of-the-five-5-star-sign-star-rating-icon-symbol-for-pictogram-apps-website-or-graphic-design-element-illustration-of-the-rating-0-5-star-format-png.png" className="img2 rounded-circle"></img><span className="sp2">4.8/5</span>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <button type="button" className="btn btn-outline-success">View</button>
                            </div>
                        </div>
                    </motion.div>
                    <div className="col-sm-1">

                    </div>
                    <motion.div className="col-sm-7 item" variants={item} onLoad={window.scrollTo(2, 2)}>
                        <div className="row r4">
                            <span className="sp2">My Achievements</span>
                            <br></br>
                            <br></br>
                            <div className="row">
                                <motion.div className="col-sm-2" whileHover={{ scale: 1.2, rotate: 90 }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: -90,
                                        borderRadius: "100%"
                                    }}>
                                    <img src="https://cdn-icons-png.flaticon.com/256/6000/6000896.png" alt="" className="im1 rounded-circle" />
                                </motion.div>
                                <div className="col-sm-1">

                                </div>
                                <motion.div className="col-sm-2" whileHover={{ scale: 1.2, rotate: -90 }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: 90,
                                        borderRadius: "100%"
                                    }}>
                                    <img src="https://cdn-icons-png.flaticon.com/256/6811/6811291.png" alt="" className="im1 rounded-circle" />
                                </motion.div>
                                <div className="col-sm-1">

                                </div>
                                <motion.div className="col-sm-2" whileHover={{ scale: 1.2, rotate: 90 }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: -90,
                                        borderRadius: "100%"
                                    }}>
                                    <img src="https://cdn-icons-png.flaticon.com/256/7602/7602899.png" alt="" className="im1 rounded-circle" />
                                </motion.div>
                                <div className="col-sm-1">

                                </div>
                                <motion.div className="col-sm-2" whileHover={{ scale: 1.2, rotate: -90 }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: 90,
                                        borderRadius: "100%"
                                    }}>
                                    <img src="https://cdn-icons-png.flaticon.com/256/7470/7470490.png" alt="" className="im1 rounded-circle" />
                                </motion.div>
                                <div className="col-sm-1">

                                </div>
                            </div>

                        </div>
                        <br></br>
                        <div className="row ro1">
                            <div className="col-sm-6">
                                <motion.img className="im3 rounded-circle" src="https://pixlok.com/wp-content/uploads/2021/04/Star-Clipart-PNG.jpg" whileHover={{ scale: 1.5 }}></motion.img><span className="sp2" style={{ color: '#F5F5F4' }}> 2000 </span><span className="sp2" style={style1}> X</span><span className="sp2">p</span>
                            </div>
                            <div className="col-sm-6">

                            </div>
                        </div>
                        <br>
                        </br>
                        <div className="row ro1">
                            <button type="button" className="btn btn-outline-success">Reedem</button>
                        </div>
                    </motion.div>
                </div>
            </motion.div >
        </motion.div>
    )
}
