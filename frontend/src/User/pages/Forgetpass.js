import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './form.css';
function Forgetpassword(){
    const navigate = useNavigate();
    const [pass,setpass] = useState();
    const [conpass,setconpass]= useState();
    let id = sessionStorage.getItem("id")
    async function reset(){
        if (pass == conpass){
            const json = {pass};
            await fetch("http://localhost:3002/reset?id="+id,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });
            alert("Password Reset Successfully");
            navigate('/login');
        }
        else{
            alert("Password doesn't match");
        }
    }
    return(
        <div className="maindiv">
            <Header/>
        <div className="mainbox">
            <div className="box2">
                 <h2 className="text1">Reset password</h2>
                <div className="childbox" >
                    <label className="text2">Password</label>
                    <input type="password" className="form1" onChange={(e)=>setpass(e.target.value)}></input>
                </div>
                <div className="childbox" >
                    <label className="text2">Confirm Password</label>
                    <input type="password" className="form1" onChange={(e)=>setconpass(e.target.value)}></input>
                </div>
                <input type="button" value="Reset" className="btn1" onClick={reset}></input>
            </div>
        </div>
        <Footer/>
        </div>
        );
}

export default Forgetpassword;