import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard'
import Lecture from './pages/Lecture'
import Lectureyoutube from './pages/Lectureyoutube';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <Routes>
          <Route path="/" ></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/lecture" element={<Lecture />}></Route>
          <Route path="/lectureyoutube" element={<Lectureyoutube />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
