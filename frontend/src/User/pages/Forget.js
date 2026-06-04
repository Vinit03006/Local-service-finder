import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import './form.css';
function Forget(){
    let id = "";
    const [user,setuser] = useState();
    const [msg,setmsg] = useState();
    const navigate = useNavigate();

     async function check(){
        const response = await fetch("http://localhost:3002/forgot?user="+user);
        const res = await response.json();
        setmsg(res.message);
        }
    
    
    return(
        <div className="maindiv">
            <Header/>
        <div className="mainbox">
            <div className="box2">
                <h2 className="text1">Forget password</h2>
                <div className="childbox">
                    <label className="text2">UserName</label>
                    <input type="text" className="form1" onChange={(e)=>setuser(e.target.value)}></input>
                </div>
                <div style={{"display":"flex"}}>
                <input type="button" value="Reset" className="btn1" onClick={check}></input>
                <input type="button" value="Cancel" className="btn1" onClick={()=>navigate("/login")}></input>
                </div>
                <label>{msg}</label>
            </div>
        </div>
        <Footer/>
        </div>
    );
}
export default Forget;