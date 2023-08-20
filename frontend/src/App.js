import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from"./pages/Login"
import Register from "./pages/Register"


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path ="/" ></Route>
        <Route path="/dashboard"></Route>
        <Route path="/login" element={<Login/>}></Route>'
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
  
    </Router>
      
    </div>
  );
}

export default App;
