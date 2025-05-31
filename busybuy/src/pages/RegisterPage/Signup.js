import React, { useRef, useContext, useEffect } from "react";
import  "./Signup.css";
import {useValue} from '../../context/productContext.js';
import {useNavigate} from 'react-router-dom';

const SignupPage = () => {

  const {setPassword, setEmail,token,setName,handleSignup} = useValue();
  const navigate = useNavigate();

  useEffect(function() {
    if (token) {
        navigate("/");  // ✅ Now it will work
    }
}, [token, navigate]);

  return (
    <div className="containerL">
      <h2 id="hel"> Sign Up</h2>
      <input
        id="iS3"
          type="email"
          placeholder="Enter Name"
          onChange={function(e) { setName(e.target.value); }}
          required
        />
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
        <button id='sU' type="submit" onClick={() => handleSignup()} >Signup</button>
       

    </div>
  );
};

export default SignupPage;
