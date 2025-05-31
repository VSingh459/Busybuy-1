import React, { useRef, useContext, useEffect } from "react";
import  "./LoginPage.css";
import {useValue} from '../../context/productContext.js';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {

  const {setPassword, setEmail,handleLogin,token} = useValue();
  const navigate = useNavigate();

  useEffect(function() {
    if (token) {
        navigate("/");  // ✅ Now it will work
    }
}, [token, navigate]);

  return (
    <div className="containerL">
      <h2 id="hel"> Sign In</h2>
        <input
        id="iS"
          type="email"
          placeholder="Enter Email"
          onChange={function(e) { setEmail(e.target.value); }}
          required
        />
        <input
        id="iS2"
          type="password"
          placeholder="Enter Password"
          onChange={function(e) { setPassword(e.target.value); }}
          required
        />
        <button id='sU' type="submit" onClick={handleLogin}>Login</button>
        <button id="SI" onClick={()=>navigate("/signup")}> Or SignUp instead</button>


    </div>
  );
};

export default LoginPage;
