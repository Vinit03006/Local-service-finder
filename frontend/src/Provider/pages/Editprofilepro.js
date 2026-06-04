import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';

import './profilepro.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey   } from "react-icons/sl";
import { FaRegSave } from "react-icons/fa";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Editprofilepro(){

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
            navigate('/proprofile');

        }
    }

    const cancel = ()=>{
        setTimeout(() => {
             navigate('/proprofile');
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
        <div className="pmaindiv2">
            <Headerpro/>
                <div className="pprofilebox">
                  <div className="pprbox1">
                    <div className="pgradientbox"></div>
                    <div className="pavatar">
                        <img src={imgPath} alt="no"></img>
                    </div>
                    <div className="pnamebox">
                    <h2 className="puname">{data.username}</h2>
                    <div className="pchild">
                    <CiCalendarDate size={20}/>
                    <p className="pdate">Start Date: {new Date(data.createdAt).toLocaleString("en-US",{dateStyle: "medium", timeStyle: "short"})}</p>
                    </div>
                    <div className="pdbox">
                        <div className="pchild1">
                            <h2 style={{"color":"white"}}>Profile Details</h2>
                            <div>
                            <button className="pebtn" onClick={editprofile}><FaRegSave/> Save</button>
                             <button className="pebtn" onClick={cancel}><MdOutlineCancel/> Cancel</button>
                             </div>
                            
                        </div>
                        <div className="pchild2">
                            <div className="pchild2row">
                                <div className="pchild2col"><SlUser size={25}/>
                                <div className="psmallbox">
                                    <p className="psmalltext"> Full name</p>
                                    <input type="text" className="pform" value={fullname} onChange={(e) => setfullname(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="pchild2col"><SlEnvolope size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Email</p>
                                     <input type="text" className="pform" value={email} onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="pchild2row">
                                <div className="pchild2col"><SlUser size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> User name</p>
                                    <p className="psmalltext1" >{data.username}</p>
                                </div>
                                </div>
                                <div className="pchild2col"><SlCallIn size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Conatct</p>
                                    <input type="text" className="pform" value={contact} onChange={(e) => setcontact(e.target.value)}></input>
                                </div>
                                </div>
                            </div>
                             <div className="pchild2row">
                                <div className="pchild2col"><SlKey size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Password</p>
                                    <p className="psmalltext1" >{data.password}</p>
                                </div>
                                </div>
                                <div className="pchild2col"><LuUsers size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> User Type</p>
                                    <p className="psmalltext1" >{data.usertype}</p>
                                </div>
                                </div>
                            </div>
                             <div className="pchild2row">
                                <div className="pchild2col">
                                    <SlLocationPin size={25}/>
                                    <div className="ppsmallbox">
                                    <p className="psmalltext"> Address</p>
                                     <input type="text" className="pform" style={{"width":"200px"}} value={address} onChange={(e) => setaddress(e.target.value)}></input>
                                </div>
                                </div>
                                <div className="pchild2col"> <PiCityThin size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> City</p>
                                    <select  className="pform1"  value={city} onChange={(e) => setcity(e.target.value)}>
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
           <Footerpro />
        </div>
    );
}

export default Editprofilepro;