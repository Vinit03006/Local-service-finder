import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';

import './profilecon.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey   } from "react-icons/sl";
import { FaRegSave } from "react-icons/fa";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Editprofilecon(){

    const navigate = useNavigate();
    const [data,setdata] = useState({});
    const [fullname,setfullname] = useState("");
    const [address,setaddress] = useState("");
    const [city,setcity] = useState("");
    const [contact,setcontact] = useState("");
    const [email,setemail] = useState("");
    const [imgPath,setimgPath] = useState();

    const id = sessionStorage.getItem("uid");
    const profile= useCallback( async() => {
        try{
        const res = await fetch("http://localhost:3002/profile?id="+id);
        const account = await res.json();
        setdata(account);
        setimgPath("http://localhost:3002/profileimages/"+account.filename);
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
         setTimeout(() => {
             navigate('/proprofile');
         }, 1000);
        
        }
        catch(error){
            alert("error editing data");
            navigate('/conprofile');

        }
    }

    const cancel = ()=>{
        setTimeout(() => {
             navigate('/conprofile');
        }, 1000);
       
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
        <div className="c-maindiv2">
            <Headercon/>
                <div className="c-profilebox">
                  <div className="c-prbox1">
                    <div className="c-gradientbox"></div>
                    <div className="c-avatar">
                        <img src={imgPath} alt="no"></img>
                    </div>
                    <div className="c-namebox">
                    <h2 className="c-uname">{data.username}</h2>
                    <div className="c-child">
                    <CiCalendarDate size={20}/>
                    <p className="c-date">Start Date: {new Date(data.createdAt).toLocaleString("en-US",{dateStyle: "medium", timeStyle: "short"})}</p>
                    </div>
                    <div className="c-dbox">
                        <div className="c-child1">
                            <h2 style={{"color":"white"}}>Profile Details</h2>
                            <div>
                            <button className="c-ebtn" onClick={editprofile}><FaRegSave/> Save</button>
                             <button className="c-ebtn" onClick={cancel}><MdOutlineCancel/> Cancel</button>
                             </div>
                            
                        </div>
                        <div className="c-child2">
                            <div className="c-child2row">
                                <div className="c-child2col"><SlUser size={25}/>
                                <div className="c-smallbox">
                                    <p className="c-smalltext"> Full name</p>
                                    <input type="text" className="c-form" value={fullname} onChange={(e) => setfullname(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="c-child2col"><SlEnvolope size={25}/>  
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Email</p>
                                     <input type="text" className="c-form" value={email} onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="c-child2row">
                                <div className="c-child2col"><SlUser size={25}/>  
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> User name</p>
                                    <p className="c-smalltext1" >{data.username}</p>
                                </div>
                                </div>
                                <div className="c-child2col"><SlCallIn size={25}/>
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Conatct</p>
                                    <input type="text" className="c-form" value={contact} onChange={(e) => setcontact(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="c-child2row">
                                <div className="c-child2col"><SlKey size={25}/>  
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Password</p>
                                    <p className="c-smalltext1" >{data.password}</p>
                                </div>
                                </div>
                                <div className="c-child2col"><LuUsers size={25}/>
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> User Type</p>
                                    <p className="c-smalltext1" >{data.usertype}</p>
                                </div>
                                </div>
                            </div>
                             <div className="c-child2row">
                                <div className="c-child2col">
                                    <SlLocationPin size={25}/>
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Address</p>
                                     <input type="text" className="c-form" style={{"width":"200px"}} value={address} onChange={(e) => setaddress(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="c-child2col"> <PiCityThin size={25}/>
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> City</p>
                                    <select  className="c-form1"  value={city} onChange={(e) => setcity(e.target.value)}>
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
           <Footercon/>
        </div>
    );
}

export default Editprofilecon;