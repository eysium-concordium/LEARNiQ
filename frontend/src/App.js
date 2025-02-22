import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Lecture from "./pages/Lecture";
import Lectureyoutube from "./pages/Lectureyoutube";
import Quiz from "./pages/Quiz";
import HomePage from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route
            path={"/lecture" || "/lecture/:search"}
            element={<Lecture />}
          ></Route>
          <Route
            path="/lectureyoutube/:playlistId"
            element={<Lectureyoutube />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
