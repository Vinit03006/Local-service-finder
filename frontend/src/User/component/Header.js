import { NavLink,useNavigate } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import './header.css';

function Header(props){
    const navigate = useNavigate();
   
    function register(){
      navigate("/register",{replace:true});
    }
   
    return(
      <div className="header" style={props.style}>
        <div className="headbox1">
          Quick<span style={{"color":"#00d4aa"}}>Serve</span>
        </div>
        <div className="headbox2">
          <ul className="navi">
            <li>
              <NavLink className="link"  to="/">Home</NavLink>
            </li>
          
            <li>
              <NavLink className="link" to="/contactus">Contact us</NavLink>
            </li>
          <li>
            <NavLink className="link" to="/about">About us</NavLink>
          </li>
          </ul>
        </div>
        <div className="headbox3">
          <NavLink className="link1" to="/login">Login</NavLink>
          <input type="button" className="button3" value="Register" onClick={register}></input>
        </div>
      </div>
    );
}
export default Header;