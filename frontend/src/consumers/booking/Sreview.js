import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './Sreview.css';

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Sreview(){
      const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const sid = sessionStorage.getItem("sid");
    const pname = sessionStorage.getItem("pname");
    const title = sessionStorage.getItem("title");
    const [rate,setrate] = useState("");
    const [review,setreview]  = useState("");

    
    const submit=async()=>{
        if(rate === "" || review === ""){
            alert("Fill All fields");
        }
        else{
            const json = {username:user.username,email:user.email,provider:pname,Service_title:title,booking_id:sid,rate:parseInt(rate),review:review,"created_date":new Date().toISOString};
            console.log(json);
            const rev = await fetch("http://localhost:3002/Sreview",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });

            const res = await rev.json();
            if(res.success){
                alert("Successfully reviewd");
                navigate('/chome');
            }

            else{
                alert("error, try agin");
                
            }
        }
    }
    return(
        <div className='sre-maindiv'>
            <Headercon/>
             <div className="sre-main-panel">
                <div className="sre-heading">Rate & Review</div>
                <div className="sre-section">
                    <div className="sre-field">
                        <label>Provider Name</label>
                        <input className="sre-input" type="text" value={pname} disabled></input>
                    </div>
                    <div className="sre-field">
                        <label>Service Title</label>
                        <input className="sre-input" type="text" value={title} disabled></input>
                    </div>
                    <div className="sre-field">
                        <label>Rate</label>
                        <select className="sre-select" onChange={(e)=>setrate(e.target.value)}>
                            <option value="">Rate</option>
                            <option value="1">1★</option>
                            <option value="2">2★</option>
                            <option value="3">3★</option>
                            <option value="4">4★</option>
                            <option value="5">5★</option>
                        </select>
                    </div>

                    <div className="sre-field">
                        <label>Review</label>
                        <textarea className="sre-input sre-textarea" onChange={(e)=>setreview(e.target.value)}></textarea>
                    </div>
                    <div className="sre-btn">
                        <button className="sre-submit" onClick={submit} >Submit</button>
                        <button className="sre-cancel">Cancel</button>
                    </div>
                    

                </div>
            </div>
            <Footercon/>
        </div>
    );
}
export default Sreview;