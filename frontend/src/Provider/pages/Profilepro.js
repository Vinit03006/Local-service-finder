import Headerpro from "../component/Headerpro";
import Footerpro from "../component/Footerpro";

import './profilepro.css';

import { useState,useEffect,useCallback } from "react";
import { SlUser,SlLocationPin,SlEnvolope ,SlCallIn, SlKey,SlPencil   } from "react-icons/sl";
import { PiCityThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";



function Profilepro(){
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
            navigate('/peditprofile');
        }, 1000);
        
    }
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
                            <button className="pebtn" onClick={edit}><SlPencil/> Edit</button>
                        </div>
                        <div className="pchild2">
                            <div className="pchild2row">
                                <div className="pchild2col"><SlUser size={25}/>
                                <div className="psmallbox">
                                    <p className="psmalltext"> Full name</p>
                                    <p className="psmalltext1" >{data.fullname}</p>
                                </div>
                                </div>
                                <div className="pchild2col"><SlEnvolope size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Email</p>
                                    <p className="psmalltext1" >{data.email}</p>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="pchild2col"><SlUser size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> User name</p>
                                    <p className="psmalltext1" >{data.username}</p>
                                </div>
                                </div>
                                <div className="pchild2col"><SlCallIn size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Conatct</p>
                                    <p className="psmalltext1" >{data.contact}</p>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="pchild2col"><SlKey size={25}/>  
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Password</p>
                                     <p className="psmalltext1">{data.password}</p>
                                </div>
                                </div>
                                <div className="pchild2col"><LuUsers size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> User Type</p>
                                    <p className="psmalltext1" >{data.usertype}</p>
                                </div>
                                </div>
                            </div>
                             <div className="child2row">
                                <div className="pchild2col">
                                    <SlLocationPin size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> Address</p>
                                    <p className="psmalltext1" >{data.address}</p>
                                </div>
                                </div>
                                <div className="pchild2col"> <PiCityThin size={25}/>
                                    <div className="psmallbox">
                                    <p className="psmalltext"> City</p>
                                    <p className="psmalltext1" >{data.city}</p>
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
 export default Profilepro;