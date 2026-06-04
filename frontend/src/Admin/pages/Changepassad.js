import Headeradmin from "../component/Headeradmin";
import Footeradmin from "../component/Footeradmin";
import Menu from "../component/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './adminprofile.css';

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
                navigate('/profilead')
              }, 5000);
        }
        else
        {
            setmsg("Wrong old password");
        }
    }

    const cancel=()=>{
        navigate('/adminhome');
    }
    
    return(
        <div className="pmaindiv">
            <Headeradmin/>
             <div className="maincontanier2">
                <Menu/>
            <div className="apassbox">
                <div className="adpassbox">
                    <h2 className="adpasstext1">Change Password</h2>
                    <div className="abox">
                        <label className="adpasstext2">Username</label>
                        <input type="text" className="adform1" value={username} ></input>
                    </div>
                    <div className="abox">
                        <label className="adpasstext2">Old Password</label>
                        <input type="password" className="adform1" onChange={(e)=>setoldpass(e.target.value)}></input>
                    </div>
                    <div className="abox">
                        <label className="adpasstext2">New password</label>
                        <input type="password" className="adform1" onChange={(e)=>setnewpass(e.target.value)}></input>
                    </div>
                    <div style={{"display":"flex"}}> 
                        <button className="adbtn1" onClick={change}>Change</button>
                        <button className="adbtn2" onClick={cancel}>Cancel</button>
                    </div>
                    <label style={{"fontSize":"15px","color":"red"}}>{msg}</label>
                </div>
            </div>
            </div>
            <Footeradmin/>
        </div>
    );
}
export default Changepassword;