import { NavLink } from 'react-router-dom';
import './menu.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BiGridAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { FaHouseUser } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { SlGraph } from "react-icons/sl";
import { TiContacts } from "react-icons/ti";
import { MdOutlineRateReview } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import ConfirmModal from '../../common/ConfirmModal';
function Menu(){
    const navigate = useNavigate();
    const [openpopup,setopenpopup] = useState(false);
    const logout=()=>{
        sessionStorage.clear();
        navigate('/');
    };

    return(
        <div className="menudiv">
            <div className='sidebar-logo'>
                <span>QuickServe</span>
                <small>Admin</small>
            </div>
            <ul className='sidebar-nav' style={{"flex":"1"}}>
                <li>
                   <span className='nav-icon'><BiGridAlt size="20"/></span><NavLink  className="side-link" to="/adminhome">Home</NavLink>
                </li>
                <li>
                   <span className='nav-icon'><CiUser size="20"/></span> <NavLink className="side-link" to="/userlist">User</NavLink>
                </li>
                
                <li>
                    <span className='nav-icon'><FaHouseUser size="20"/></span><NavLink className="side-link" to="/services">Service</NavLink>
                </li>
                <li>
                    <span className='nav-icon'><CiCalendar size="20"/></span><NavLink className="side-link" to="/Bookinglist">Booking</NavLink>
                </li>
                <li>
                    <span className='nav-icon'><SlGraph size="20"/></span><NavLink className="side-link" to="/requestservice">Request</NavLink>
                </li>
                
                </ul>
                
               
               

          
           <div className='sidebar-bottom'>
           <button className='logout-btn' onClick={()=>{setopenpopup(true)}}><MdLogout size="20"/>Log Out</button>
           <ConfirmModal isOpen={openpopup} onClose={()=>setopenpopup(false)} onConfirm={logout} message="Are you Sure you want to Log Out?"/>
           </div>
           
        </div>
    );
}
export default Menu;