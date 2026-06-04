import { SlUser } from "react-icons/sl";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";  
import ConfirmModal from "../../common/ConfirmModal";
import './headerpro.css';

function Headerpro() {
  const navigate = useNavigate();

  const username = sessionStorage.getItem("uname");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openpopup,setopenpopup] = useState(false);

  const toggledropdown = (e) => {
    e.stopPropagation();      
    setOpen(!open);
    setOpen1(false);
  };

  const toggledropdown1 = (e) => {
    e.stopPropagation();       
    setOpen1(!open1);
    setOpen(false);
  };


  useEffect(() => {
    function handleclickoutside() {
      setOpen(false);
      setOpen1(false);
    }

    document.addEventListener("click", handleclickoutside);
    return () => document.removeEventListener("click", handleclickoutside);
  }, []);

  const logout = () => {
    sessionStorage.clear();  
    navigate('/');
  };

  return (
    <div className="pheader">
      <div className="pheadbox1">
        <h3>Quick<span style={{"color":"#00d4aa"}}>Serve</span></h3>
      </div>

      <div className="pheadbox2">
        <ul className="pnavi">
          <li>
            <NavLink className="plink" to="/prohome">Home</NavLink>
          </li>

          <li className="pdropdown">
            <NavLink className="plink" onClick={toggledropdown}>Manage Service</NavLink>
            <ul className={`pdropdown-menu ${open ? "show" : ""}`}>
              <li><NavLink className="plink" to='/addservice' onClick={() => setOpen(false)}>Add Service</NavLink></li>
              <li><NavLink className="plink" to='/handleservice' onClick={() => setOpen(false)}>Edit/Remove</NavLink></li>
              <li><NavLink className="plink" to='/handlebooking' onClick={() => setOpen(false)}>Request Service</NavLink></li>
              <li><NavLink className="plink" to='/work' onClick={() => setOpen(false)}>Service Status</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink className="plink" to="/reviewr">Review</NavLink>
          </li>

          <li>
            <NavLink className="plink" to="/contactr">Contact us</NavLink>
          </li>
          <li>
            <NavLink className="plink" to="/aboutr">About us</NavLink>
          </li>
        </ul>
      </div>

      <div className="pheadbox3">
        <ul className="pnavi">
          <li className="pdropdown1">
            <div className="p-link-2" onClick={toggledropdown1}>
              <div className="p-user">
              <SlUser size="20" />
                <div className="p-basic">
                  {username}
                </div>
              </div>
              <span className="p-user-badge">Provider</span>
              
            </div>

            <ul className={`pdropdown1-menu ${open1 ? "show" : ""}`}>
              <li>
                <NavLink className="plink3" to='/proprofile' onClick={() => setOpen1(false)}>Profile </NavLink>
              </li>
               <li>
                <NavLink className="plink3" to='/changepassword' onClick={() => setOpen1(false)}>Change Pasword</NavLink>
              </li>
              <li>
                <button className="hiddenbtn" onClick={()=>setopenpopup(true)}>Log Out</button>
              </li>
            </ul>
          </li>
        </ul>
         <ConfirmModal isOpen={openpopup} onClose={()=>setopenpopup(false)} onConfirm={logout} messageessage="Are you Sure you want to Log Out?"/>
      </div>

    </div>
  );
}

export default Headerpro;

