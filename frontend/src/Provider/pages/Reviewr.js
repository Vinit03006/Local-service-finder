import Headerpro from "../component/Headerpro";
import Footerpro from "../component/Footerpro";
import './Reviewr.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reviewr(){

    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [rate,setrate] = useState("");
    const [review,setreview]  = useState("");


    const submit=async()=>{
        if(rate === "" || review === ""){
            alert("Fill All fields");
        }
        else{
            const json = {user_id:user._id,username:user.username,email:user.email,rate:parseInt(rate),review:review,"created_date":new Date().toISOString}
            console.log(json);
            const rev = await fetch("http://localhost:3002/review",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });

            const res = await rev.json();
            if(res.success){
                alert("Successfully reviewd");
                navigate('/prohome');
            }

            else{
                alert("error, try agin");
                
            }
        }
    }

    return(
        <div className="r-maindiv">
            <Headerpro/>
            <div className="r-main-panel">
                <div className="r-heading">Rate & Review</div>
                <div className="r-section">
                    <div className="r-field">
                        <label>Username</label>
                        <input className="r-input" type="text" value={user.username} disabled></input>
                    </div>
                    <div className="r-field">
                        <label>Email Id</label>
                        <input className="r-input" type="text" value={user.email} disabled></input>
                    </div>
                    <div className="r-field">
                        <label>Rate</label>
                        <select className="r-select" onChange={(e)=>setrate(e.target.value)}>
                            <option value="">Rate</option>
                            <option value="1">1★</option>
                            <option value="2">2★</option>
                            <option value="3">3★</option>
                            <option value="4">4★</option>
                            <option value="5">5★</option>
                        </select>
                    </div>

                    <div className="r-field">
                        <label>Review</label>
                        <textarea className="r-input r-textarea" onChange={(e)=>setreview(e.target.value)}></textarea>
                    </div>
                    <div className="r-btn">
                        <button className="r-submit" onClick={submit}>Submit</button>
                        <button className="r-cancel">Cancel</button>
                    </div>
                    

                </div>
            </div>
            <Footerpro/>
        </div>
    );
}
export default Reviewr;