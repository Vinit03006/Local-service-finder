import { NavLink,useNavigate } from "react-router-dom";
import ConfirmModal from "../../common/ConfirmModal";
import { useEffect } from "react";

import './adminheader.css';
import { useState } from "react";

function Header(){
  const username = sessionStorage.getItem("uname");
  const[open,setOpen] = useState(false);
  const[openpopup,setopenpopup] = useState(false);
  const navigate = useNavigate();
  const logout=()=>{
    navigate("/");
  }
    
  const toggledropdown =(e)=>{
    e.stopPropagation();
    setOpen(!open);      
  }
  useEffect(()=>{
        function handleclickoutside(event){
           setOpen(false);          
        }
        document.addEventListener("click",handleclickoutside);
        return() =>{
          document.removeEventListener("click",handleclickoutside);
          }
        },[])
    
       

    return(
      <div className="ad-header">
        <h1>Admin Panel</h1>
        <div className="ad-rightbar">
          <div className="ad-live-badge"><span className="ad-dot"/>Live</div>
          <div className="ad-dropdown">
            <div className="ad-avatar" onClick={toggledropdown}>{username.slice(0,1)}</div>
              <ul className={`ad-dropdown-menu ${open ? "show": "" }`}>
                <li><NavLink className="ad-link" to="/profilead">Profile</NavLink></li>
                <li><NavLink className="ad-link" to="/changepassad">Change Password</NavLink></li>
                <li><button className="ad-hiddenbtn1" onClick={()=>{setopenpopup(true)}}>logout</button></li>
               
            </ul>
            </div>
             <ConfirmModal isOpen={openpopup} onClose={()=>setopenpopup(false)} onConfirm={logout} message="Are you Sure you want to Log Out?"/>
        </div>
      </div>
    );
}
export default Header;