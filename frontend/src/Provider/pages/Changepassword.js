import Headerpro from "../component/Headerpro";
import Footerpro from "../component/Footerpro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './profilepro.css';

function Changepassword(){
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
        navigate('/prohome');
    }
    
    return(
        <div className="pmaindiv">
            <Headerpro/>
            <div className="cpassbox">
                <div className="passbox">
                    <h2 className="passtext1">Change Password</h2>
                    <div className="sbox">
                        <label className="passtext2">Username</label>
                        <input type="text" className="sform1" value={username} ></input>
                    </div>
                    <div className="sbox">
                        <label className="passtext2">Old Password</label>
                        <input type="password" className="sform1" onChange={(e)=>setoldpass(e.target.value)}></input>
                    </div>
                    <div className="sbox">
                        <label className="passtext2">New password</label>
                        <input type="password" className="sform1" onChange={(e)=>setnewpass(e.target.value)}></input>
                    </div>
                    <div style={{"display":"flex"}}> 
                        <button className="sbtn1" onClick={change}>Change</button>
                        <button className="sbtn2" onClick={cancel}>Cancel</button>
                    </div>
                    <label style={{"fontSize":"15px","color":"red"}}>{msg}</label>
                </div>
            </div>
            <Footerpro/>
        </div>
    );
}
export default Changepassword;