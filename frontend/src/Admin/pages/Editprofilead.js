import Headeradmin from "../component/Headeradmin";
import Menu from "../component/Menu";
import './adminprofile.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey   } from "react-icons/sl";
import { FaRegSave } from "react-icons/fa";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Editprofilead(){

    const navigate = useNavigate();
    const [data,setdata] = useState({});
     const [fullname,setfullname] = useState("");
    const [address,setaddress] = useState("");
    const [city,setcity] = useState("");
    const [contact,setcontact] = useState("");
    const [email,setemail] = useState("");

    const id = sessionStorage.getItem("uid");
    const profile= useCallback( async() => {
        try{
        const res = await fetch("http://localhost:3002/profile?id="+id);
        const account = await res.json();
        setdata(account);
        }
        catch(error){
            alert("error fetching data");
        }
    },[id]);

    const editprofile = async()=>{
        try{
        const json = {fullname,address,city,email,"contact":parseInt(contact)};
         const res = await fetch("http://localhost:3002/editprofile?id="+id,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(json)
         });
         navigate('/profilead');
        }
        catch(error){
            alert("error editing data");
            navigate('/profilead');

        }
    }

    const cancel = ()=>{
        navigate('/profilead');
    }

    useEffect(()=>{
        profile();
    },[profile])

     useEffect(() => {
    if (data.fullname) {
      setfullname(data.fullname);
      setaddress(data.address);
      setcity(data.city);
      setcontact(data.contact);
      setemail(data.email);
    }
  }, [data]);

    return(
        <div className="admiandiv2">
            <Headeradmin/>
            <div className="maincontanier2">
                <Menu/>
                <div className="adprofilebox">
                  <div className="prbox1">
                    <div className="gradientbox"></div>
                    <div className="namebox">
                    <h2 className="uname">{data.username}</h2>
                    <div className="child">
                    <CiCalendarDate size={20}/>
                    <p className="date">Start Date: {new Date(data.createdAt).toLocaleString("en-US",{dateStyle: "medium", timeStyle: "short"})}</p>
                    </div>
                    <div className="dbox">
                        <div className="child1">
                            <h2>Profile Details</h2>
                            <div>
                            <button className="ebtn" onClick={editprofile}><FaRegSave/> Save</button>
                             <button className="ebtn" onClick={cancel}><MdOutlineCancel/> Cancel</button>
                             </div>
                        </div>
                        <div className="child2">
                            <div className="child2row">
                                <div className="child2col"><SlUser size={25}/>
                                <div className="smallbox">
                                    <p className="smalltext"> Full name</p>
                                    <input type="text" className="eadform" value={fullname} onChange={(e) => setfullname(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="child2col"><SlEnvolope size={25}/>  
                                    <div className="smallbox">
                                    <p className="smalltext"> Email</p>
                                     <input type="text" className="eadform" style={{"width":"200px"}} value={email} onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="child2col"><SlUser size={25}/>  
                                    <div className="smallbox">
                                    <p className="smalltext"> User name</p>
                                    <p className="smalltext1" >{data.username}</p>
                                </div>
                                </div>
                                <div className="child2col"><SlCallIn size={25}/>
                                    <div className="smallbox">
                                    <p className="smalltext"> Conatct</p>
                                    <input type="text" className="eadform" value={contact} onChange={(e) => setcontact(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="child2col"><SlKey size={25}/>  
                                    <div className="smallbox">
                                    <p className="smalltext"> Password</p>
                                    <p className="smalltext1" >{data.password}</p>
                                </div>
                                </div>
                                <div className="child2col"><LuUsers size={25}/>
                                    <div className="smallbox">
                                    <p className="smalltext"> User Type</p>
                                    <p className="smalltext1" >{data.usertype}</p>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="child2col">
                                    <SlLocationPin size={25}/>
                                    <div className="smallbox">
                                    <p className="smalltext"> Address</p>
                                     <input type="text" className="eadform" style={{"width":"200px"}} value={address} onChange={(e) => setaddress(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="child2col"> <PiCityThin size={25}/>
                                    <div className="smallbox">
                                    <p className="smalltext"> City</p>
                                    <select  className="eadform" value={city} onChange={(e) => setcity(e.target.value)}>
                                        <option>Gandevi</option>
                                        <option>Surat</option>
                                        <option>Navsari</option>

                                    </select>
                                </div></div>
                            </div>
                        </div>
                    </div>

                    </div>
                  </div>

                </div>
            </div>
        </div>
    );
}

export default Editprofilead;