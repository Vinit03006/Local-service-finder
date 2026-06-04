import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './contactc.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Contactusc(){
    const navigate = useNavigate();
    
    const [username,setusername] = useState(sessionStorage.getItem("uname"));
    const [email,setemail] = useState(sessionStorage.getItem("email"));
    const [message,setmessage] = useState("");

    const contactus=async()=>{
        if(username === "" || email === ""  || message === "" ){
            alert("fill all details");
        }
        else{
            const json = {username:username,email:email,message:message};

            const res = await fetch("http://localhost:3002/contactus",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });
            const res2 = await res.json();
            if(res2.success === true){
            alert("sent successfully");
            navigate('/');
            }
            else{
                alert("error");
            }
        }
    }

    return(
        <div className="maindiv">
            <Headercon/>
            <div className="mainbox">
                <div class="form-section">
                    <div className="c-form-title">Contact Us</div>
                    <div className="c-field-group">
                        <label>UserName</label>
                        <input type="text" value={username} disabled></input>
                    </div>   
                    <div className="c-field-group">
                        <label>Email</label>
                        <input type="text" value={email} disabled></input>
                    </div>
                    <div className="c-field-group">
                        <label>Message</label>
                        <textarea onChange={(e)=>setmessage(e.target.value)}  ></textarea>
                    </div>
                    <button className="c-btn-submit" onClick={contactus}>Submit</button>

                </div>

            </div>
            <Footercon/>
        </div>
    );
}

export default Contactusc;