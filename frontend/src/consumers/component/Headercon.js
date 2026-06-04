import { NavLink,useNavigate } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import ConfirmModal from "../../common/ConfirmModal";
import './headercon.css';
import { SlUser } from "react-icons/sl";

function Headercon(props){
    const navigate = useNavigate();
    const username = sessionStorage.getItem("uname");
    const [ openpopup,setopenpopup] = useState(false);
    const [open,setOpen] = useState(false);
    const [open1,setOpen1] = useState(false);
   
    const toggledropdown =(e)=>{
      e.stopPropagation();
      setOpen(!open);
      setOpen1(false);
    }
     const toggledropdown1 =(e)=>{
      e.stopPropagation();
      setOpen1(!open1);
      setOpen(false);
    }
    useEffect(()=>{
      function handleclickoutside(event){
         setOpen(false);
         setOpen1(false);
      
      }
      document.addEventListener("click",handleclickoutside);
    

      return() =>{
      document.removeEventListener("click",handleclickoutside);
      }
    },[])

    const logout=()=>{
      sessionStorage.clear();
      navigate('/');
    }
     
    return(
      <div className="c-header" style={props.style}>
        <div className="c-headbox1">
          Quick<span>Serve</span>
        </div>
        <div className="c-headbox2">
          <ul className="c-navi">
            <li>
              <NavLink className="c-link"  to="/chome">Home</NavLink>
            </li>
            <li className="c-dropdown">
              <NavLink className="c-link"onClick={toggledropdown}>Service</NavLink>
                <ul className={`c-dropdown-menu ${open ? "show": "" }`}>
                  <li><NavLink className="c-link"  to='/search' onClick={()=>setOpen(false)}>Search</NavLink></li>
                  <li><NavLink className="c-link"  to='/booking_status' onClick={()=>setOpen1(false)}>Booking Status</NavLink></li>
                  <li><NavLink  className="c-link" to='/mybooking' onClick={()=>setOpen(false)}>My Booking</NavLink></li>

                </ul>
            </li>
             
            <li>
              <NavLink className="c-link" to="/reviewc">Review</NavLink>
            </li>

            <li>
              <NavLink className="c-link" to="/contactusc">Contact us</NavLink>
            </li>
          <li>
            <NavLink className="c-link" to="/aboutc">About us</NavLink>
          </li>
          </ul>
        </div>
        <div className="c-headbox3">
          <ul className="c-navi">
            <li className="c-dropdown1">
                <div className="c-link-2" onClick={toggledropdown1}>
                  <div className="c-user">
                  <SlUser size="15" />
                  <div className="c-basic">
                  {username}
                  </div>
              </div>
              <span className="c-user-badge">Consumer</span>
                </div>
                <ul className={`c-dropdown1-menu ${open1 ? "show": ""}`}>
                  <li>
                    <NavLink className="c-link3" to='/conprofile' onClick={()=>setOpen1(false)}>Profile</NavLink>
                  </li>
                   <li>
                    <NavLink className="c-link3" to='/cchangepassword' onClick={()=>setOpen1(false)}>Change Password</NavLink>
                  </li>
                   <li>
                    <button className="hiddenbtn1" onClick={()=>setopenpopup(true)}>Log Out</button>
                  </li>

                </ul>
            </li>
          </ul>
          <ConfirmModal isOpen={openpopup} onClose={()=>setopenpopup(false)} onConfirm={logout} message="Are you Sure you want to Log Out?"/>
        </div>
      </div>
    );
}
export default Headercon;