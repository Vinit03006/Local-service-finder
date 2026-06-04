import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './profilecon.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey,SlPencil   } from "react-icons/sl";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";



function Profilecon(){
    const [imgPath, setImgPath] = useState("");
    const navigate = useNavigate();
    const [data,setdata] = useState({});

    const id = sessionStorage.getItem("uid");
    const profile= useCallback( async() => {
        try{
        const res = await fetch("http://localhost:3002/profile?id="+id);
        const account = await res.json();
        setdata(account);
        setImgPath("http://localhost:3002/profileimages/" + account.filename);
        }
        catch(error){
            alert("error fetching data");
        }
    },[id]);

    

    useEffect(()=>{
        profile();
    },[profile])

    const edit=()=>{
        setTimeout(() => {
            navigate('/ceditprofile');
        }, 1000);
        
    }
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
                            <button className="c-ebtn" onClick={edit}><SlPencil/> Edit</button>
                        </div>
                        <div className="c-child2">
                            <div className="c-child2row">
                                <div className="c-child2col"><SlUser size={25}/>
                                <div className="c-smallbox">
                                    <p className="c-smalltext"> Full name</p>
                                    <p className="c-smalltext1" >{data.fullname}</p>
                                </div>
                                </div>
                                <div className="c-child2col"><SlEnvolope size={25}/>  
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Email</p>
                                    <p className="c-smalltext1" >{data.email}</p>
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
                                    <p className="c-smalltext1" >{data.contact}</p>
                                </div>
                                </div>
                            </div>
                             <div className="c-child2row">
                                <div className="c-child2col"><SlKey size={25}/>  
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> Password</p>
                                     <p className="c-smalltext1">{data.password}</p>
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
                                    <p className="c-smalltext1" >{data.address}</p>
                                </div>
                                </div>
                                <div className="c-child2col"> <PiCityThin size={25}/>
                                    <div className="c-smallbox">
                                    <p className="c-smalltext"> City</p>
                                    <p className="c-smalltext1" >{data.city}</p>
                                </div></div>
                            </div>
                        </div>
                    </div>

                    </div>
                  </div>

                </div>
            <Footercon />
        </div>
    );
}
 export default Profilecon;