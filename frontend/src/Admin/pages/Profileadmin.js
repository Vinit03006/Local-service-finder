import Headeradmin from "../component/Headeradmin";
import Menu from "../component/Menu";
import './adminprofile.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey,SlPencil   } from "react-icons/sl";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";



function Profileadmin(){
    const navigate = useNavigate();
    const [data,setdata] = useState({});

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

    useEffect(()=>{
        profile();
    },[profile])

    const edit=()=>{
        navigate('/editprofilead');
    }
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
                            <button className="ebtn" onClick={edit}><SlPencil/> Edit</button>
                        </div>
                        <div className="child2">
                            <div className="child2row">
                                <div className="child2col"><SlUser size={25}/>
                                <div className="smallbox">
                                    <p className="smalltext"> Full name</p>
                                    <p className="smalltext1" >{data.fullname}</p>
                                </div>
                                </div>
                                <div className="child2col"><SlEnvolope size={25}/>  
                                    <div className="smallbox">
                                    <p className="smalltext"> Email</p>
                                    <p className="smalltext1" >{data.email}</p>
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
                                    <p className="smalltext1" >{data.contact}</p>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="child2col"><SlKey size={25}/>  
                                    <div className="smallbox">
                                    <p className="smalltext"> Password</p>
                                     <p className="smalltext1">{data.password}</p>
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
                                    <p className="smalltext1" >{data.address}</p>
                                </div>
                                </div>
                                <div className="child2col"> <PiCityThin size={25}/>
                                    <div className="smallbox">
                                    <p className="smalltext"> City</p>
                                    <p className="smalltext1" >{data.city}</p>
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
 export default Profileadmin;