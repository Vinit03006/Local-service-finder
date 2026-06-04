import Header from "../component/Header";
import Footer from "../component/Footer";
import './contact.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Contactus(){
    const navigate = useNavigate();
    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
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
            <Header/>
            <div className="mainbox">
                <div class="form-section">
                    <div className="c-form-title">Contact Us</div>
                    <div className="c-field-group">
                        <label>UserName</label>
                        <input type="text" onChange={(e)=>setusername(e.target.value)}></input>
                    </div>   
                    <div className="c-field-group">
                        <label>Email</label>
                        <input type="text" onChange={(e)=>setemail(e.target.value)}></input>
                    </div>
                    <div className="c-field-group">
                        <label>Message</label>
                        <textarea onChange={(e)=>setmessage(e.target.value)}  ></textarea>
                    </div>
                    <button className="c-btn-submit" onClick={contactus}>Submit</button>

                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default Contactus;