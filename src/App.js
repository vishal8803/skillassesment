import './App.css';
import { useState, useEffect } from 'react';
import Quiz from './Components/quiz';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';

function App() {
  
  const [isLogin, setIsLogin] =  useState(false);
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))
    
    if(user && user.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  },[])
  return (
    <div className="App"> 
     <Router>
     <Routes>
     <Route path="/home" element={<Quiz />} />
     <Route path="/" element={<Login setIsLogin = {setIsLogin}  />} />
     <Route path="/Signup" element={<Signup setIsLogin = {setIsLogin} />} />
      
      </Routes>
      </Router>
      </div>
  );
}

export default App;
