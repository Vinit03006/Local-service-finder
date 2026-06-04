import Header from "../component/Header";
import Footer from "../component/Footer";
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import './form.css';
function Login(){
    const navigate = useNavigate();
    const[user,setuser] = useState("");
    const[pass,setpass] = useState("");
    const[msg,setmsg] = useState("");
    
     async function login(){
        if (user === "" || pass === ""){
            if(user === ""){
                alert("enter a username");
            }
            else{
                alert("enter a password");
            }
        }
        else{
        const response = await fetch("http://localhost:3002/login?user="+user);
           
        const account = await response.json();
        try{
         if (account.success === false){
            setmsg("User Not Found");
         }
    else{
        if (pass === account.password){
            alert("Login sucsessfully");
            sessionStorage.setItem("user",JSON.stringify(account));
            sessionStorage.setItem("uid",account._id);
            sessionStorage.setItem("uname",account.username);
            sessionStorage.setItem("email",account.email);
            sessionStorage.setItem("phone",account.contact);
            if(account.usertype === "Admin"){
                
                navigate('/adminhome',{replace:true});
            }
            else if(account.usertype === "Provider"){
                navigate('/prohome');
            }
            else if(account.usertype === "consumer"){
                navigate('/chome');
            }
           
        }
        else{
            setmsg("Wrong Passwords");
        } 
    }
     }
     catch(err){
        setmsg("User Not found");
     }
    }
    
      }

    return(  
        <div style={{"backgroundColor":"greys"}}>
        <div className="l-maindiv">
            <Header style={{  borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}/>
            <div className="l-mainbox">
                <div className="l-box">
                    <h2 className="l-text1">Login</h2>
                    <div className="l-childbox" >
                        <label className="l-text2">Username</label>
                        <input type="text" className="l-form1" onChange={(e)=>setuser(e.target.value)} ></input>
                    </div>
                    <div className="l-childbox" >
                        <label className="l-text2">Password</label>
                        <input type="password" className="l-form1" onChange={(e)=>setpass(e.target.value)}></input>
                        <NavLink className="l-link2" to="/forget">Forget Password ?</NavLink>
                    </div>
                    <div>
                        <input type="button" className="l-btn1" value="Login" onClick={login}></input>
                    </div>
                   <NavLink className="l-link2"  style={{"margin":"1%"}}to="/register">Don't have Account ! Register</NavLink> 
                    <label style={{"fontsize":"15px","color":"red"}}>{msg}</label>
                </div>
                <div className="l-imgbox"><img src='images/login.jpg' alt="login"></img></div>
            </div>
            </div>
            </div>
    );
}

export default Login;