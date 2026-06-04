import Headeradmin from "../component/Headeradmin";
import Menu from "../component/Menu";
import './email.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Email(){
    const naviagte = useNavigate();
    const [emailto,setemailto] = useState();
    const [subject,setsubject] = useState();
    const [message,setmessage] = useState();
    const [msg,setmsg] = useState();

    const sendemail=async()=>{
        const json = {emailto,subject,message};
        const response = await fetch("http://localhost:3002/sendemail",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(json)
        });
        const res = await response.json();
        setmsg(res.message)
    }
    function cancel(){
        naviagte('/adminhome');

    }
    return(
        <div className="emaindiv">
            <Headeradmin/>
            <div className="emaincontanier1">
                <Menu/>
                <div className="eadminbox">
                    <div className="ebox2">
                    <h2 className="etext1">Send A Email</h2>
                    <div className="echildbox1">
                        <label className="text2">Email Address</label>
                        <input type="text" className="eform1" onChange={(e)=>setemailto(e.target.value)}></input>
                    </div>
                    <div className="echildbox1">
                        <label className="etext2">Subject</label>
                        <input type="text" className="eform1" onChange={(e)=>setsubject(e.target.value)}></input>
                    </div>
                    <div className="echildbox1">
                        <label className="etext2">Message</label>
                        <input type="text" className="eform1" onChange={(e)=>setmessage(e.target.value)}></input>
                       
                    </div>
                    <div style={{"margin":"1%","display":"flex"}}>
                        <input type="button" className="ebtn1" value="Send" onClick={sendemail}></input>
                        <input type="button" className="ebtn1" value="cancel" onClick={cancel}></input>
                    </div>
                     <div className="echildbox1">
                        <label>{msg}</label>
                       
                    </div>

                </div>
            </div>
            </div>
        </div>
    );
}
 export default Email;