import Headerpro from "../Provider/component/Headerpro";
import Footerpro from "../Provider/component/Footerpro";
import Headercon from "../consumers/component/Headercon";
import Footercon from "../consumers/component/Footercon";
import './ServiceDeatils.css';
import { useEffect, useState } from "react";

import { FaLocationDot } from "react-icons/fa6";
import { FaStar,FaUser, FaCheck   } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ServiceDetails(){
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const sid = sessionStorage.getItem("sid");
    const state = sessionStorage.getItem("state");
    
    const [data,setdata] = useState([]);
    const [udata,setudata] = useState([]);
    const [rdata,setrdata] = useState([]);
    const [include,setinclude] = useState([]);

    const details =async() =>{
        const res =  await fetch("http://localhost:3002/servicedetails?sid="+sid);
        const result = await res.json();
        setdata(result.data);
        setudata(result.userdata);
        setrdata(result.rdata);
        console.log(state);
        setinclude(result.data.includes);    
    }
    
    const edit=()=>{
        sessionStorage.setItem("sid",sid);
        navigate('/editservice');
    }

    const remove=async()=>{
        
        const response = await fetch("http://localhost:3002/removeservice?sid="+sid);
        const res2 = await response.json();
        alert("service Deleted Successfully");
        

    }
    
    const booking=()=>{
        sessionStorage.setItem("sid",sid);
        navigate('/booking');

    }

    useEffect(()=>{
        details();
    },[])

    return(
        <div className="sd-maindiv">
            {state == 1 ? <Headerpro/> : <Headercon/>}
            <div className="sd-main-panel">
                <div className="sd-badge">{data.category}</div>
                <div className="sd-title">{data.title}</div>
                <div className="sd-meta-row">
                    <div className="sd-meta">
                        <div className="sd-meta-logo"><FaLocationDot/></div>
                        {udata.city}
                    </div>
                     <div className="sd-meta">
                        <div className="sd-meta-logo"><FaStar/></div>
                        {udata.avgRating} Avg rating
                    </div>
                     <div className="sd-meta">
                        <div className="sd-meta-logo"><FaUser/></div>
                        {udata.Complete_job} Booking Completed
                    </div>
                </div>
                <div className="sd-section">
                    <div className="sd-sec-title">About This Service</div>
                    <p className="sd-desc">{data.decription}</p>
                </div>
                <div className="sd-section">
                    <div className="sd-sec-title">What's Include</div>
                    <div className="sd-includes">
                        {include && include.map((item)=>(
                             <div className="sd-include-item" key={item}><div className="sd-check"><FaCheck size="8" color="#2dd4a4"/></div>{item}</div>
                        ))}
                    </div>
                </div>
                <div className="sd-section">
                    <div className="sd-sec-title">What's Include</div>
                    <div className="sd-provider">
                        <div className="sd-prov-av"> {udata?.username?.toUpperCase().slice(0, 1) || ""}</div>
                        <div>
                            <div className="sd-prov-name">{udata.username}</div>
                            <div className="sd-prov-sub">{udata.city} • {udata.address}</div>
                        </div>
                    </div>
                    <div className="sd-prov-stats">
                        <div className="sd-prov-stat">
                            <div className="sd-prov-stat-val">{udata.Complete_job}</div>
                            <div className="sd-prov-stat-label">complete Bookings</div>
                        </div>
                        <div className="sd-prov-stat">
                            <div className="sd-prov-stat-val">{udata.Services}</div>
                            <div className="sd-prov-stat-label">Services</div>
                        </div>
                        <div className="sd-prov-stat">
                            <div className="sd-prov-stat-val">{udata.avgRating}★</div>
                            <div className="sd-prov-stat-label">Rating</div>
                        </div>
                    </div>
                </div>
                <div className="sd-section">
                    <div className="sd-sec-title">Customer Review</div>
                    <div className="sd-reviews">
                        { rdata && rdata.map((item)=>(
                            <div className="sd-review">
                            <div className="sd-review-top">
                                <div className="sd-reviewer">
                                    <div className="sd-rev-av" style={{"background":"rgba(99,153,34,0.15)","color":"#639922"}}>{item.username?.toUpperCase().slice(0, 1) || ""}</div>
                                    <div>
                                        <div className="sd-rev-name">{item.username}</div>
                                        <div className="sd-rev-date"> {new Date(item.created_date).toLocaleString("en-US",{month: "long", year: "numeric"})}</div>
                                    </div>
                                </div>
                                <div style={{"color":"white"}}>{item.rate} ★</div>
                                
                            </div>
                            <p className="sd-rev-text">{item.review}</p>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="sd-section">
                    <div className="sd-sec-title">Booking</div>
                    <div className="sd-booking-div">
                        <div style={{"display":"flex","alignItems":"center"}}>
                            <span className="sd-price-val">{data.price}</span>
                            <span className="sd-price-unit">/{data.pricing_type}</span>
                        </div>
                         {state == 1 ?  <div className="sd-actions">
                           
                            <button className="sd-edit-btn" onClick={()=>edit()}>Edit</button>
                            <button className="sd-del-btn" onClick={()=>remove()}>Delete</button>
                        </div> : <button className="sd-edit-btn"  onClick={()=>booking()}>Booking</button> }
                       
                    </div>
                </div>
            </div>
             {state == 1 ? <Footerpro/> : <Footercon/>}
        </div>
    );
}
export default ServiceDetails;