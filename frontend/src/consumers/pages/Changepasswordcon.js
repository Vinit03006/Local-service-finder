import Headercon from "../component/Headercon";
import Footercon from "../component/Footercon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './profilecon.css';

function Changepasswordcon(){
    const navigate = useNavigate();
    const [username,setusername] = useState(sessionStorage.getItem("uname"));
    const [oldpass,setoldpass] = useState();
    const [newpass,setnewpass] = useState();
    const [msg,setmsg] = useState();

    const change=async()=>{
        const id = sessionStorage.getItem("uid");
        const res = await fetch("http://localhost:3002/checkpass?id="+id+"&pass="+oldpass);
        const acc = await res.json();
        if(acc.success === true){
              const res2 = await fetch("http://localhost:3002/changepass?id="+id+"&pass="+newpass);
              setmsg("Password Successfully Changed");
              
              await setTimeout(() => {
                navigate('/proprofile')
              }, 5000);
        }
        else
        {
            setmsg("Wrong old password");
        }
    }

    const cancel=()=>{
        navigate('/chome');
    }
    
    return(
        <div className="c-maindiv">
            <Headercon/>
            <div className="c-cpassbox">
                <div className="c-passbox">
                    <h2 className="c-passtext1">Change Password</h2>
                    <div className="c-sbox">
                        <label className="c-passtext2">Username</label>
                        <input type="text" className="c-sform1" value={username} ></input>
                    </div>
                    <div className="c-sbox">
                        <label className="c-passtext2">Old Password</label>
                        <input type="password" className="c-sform1" onChange={(e)=>setoldpass(e.target.value)}></input>
                    </div>
                    <div className="c-sbox">
                        <label className="c-passtext2">New password</label>
                        <input type="password" className="c-sform1" onChange={(e)=>setnewpass(e.target.value)}></input>
                    </div>
                    <div style={{"display":"flex"}}> 
                        <button className="c-sbtn1" onClick={change}>Change</button>
                        <button className="c-sbtn2" onClick={cancel}>Cancel</button>
                    </div>
                    <label style={{"fontSize":"15px","color":"red"}}>{msg}</label>
                </div>
            </div>
            <Footercon/>
        </div>
    );
}
export default Changepasswordcon;