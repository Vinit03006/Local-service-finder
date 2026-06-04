import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import { useNavigate } from "react-router-dom";
import Slider from "../../common/Slider";
import Heroslider from "../../common/Heroslider";

import { FaCheck } from "react-icons/fa6";

import './homec.css';

import { CiSearch,CiLocationOn } from "react-icons/ci";
import { useState,useEffect } from 'react';
import { SlUser } from 'react-icons/sl';
function Homec(){
    const navigate = useNavigate();
    const [data,setdata] = useState([]);
    const [sdata,setsdata] = useState([]);
    const [rdata,setrdata] = useState([]);
    function login(){
        navigate("/login",{replace:true});

    }
     const booking=(id)=>{
        sessionStorage.setItem("sid",id);
        navigate('/booking');

    }

    
        const homedetails = async() =>{
            const res = await fetch("http://localhost:3002/chome");
            const res2 = await res.json();
            setdata(res2);
            setsdata(res2.sdetails);
            setrdata(res2.review);
            console.log(res2);
        }
        useEffect(()=>{
            homedetails();
        },[])
    return(
        <div className="c-maindiv">
            <Headercon/>
            <Heroslider>
                <div className="hero">
                <h1>
                    Find <em>Trusted</em><br/>
                    Local Services<br/>
                    Near You
                </h1>

                <div className="hero-sub">
                    Connect with verified professionals — plumbers, electricians, cleaners & more.
                    Book in minutes, Get served.
                </div>

                <div className="quick-tags">
                    <label className="qt-label">Popular :</label>
                    <div className="qt-tag">Mechanic</div>
                    <div className="qt-tag">Plumber</div>
                    <div className="qt-tag">Cleaning</div>
                    <div className="qt-tag">Ac repair</div>
                </div>
                </div>
            </Heroslider>
        <div className="c-status-bar">
            <div className="c-stat">
                <div className="c-stat-n">{data.users}</div>
                <div className="c-stat-1">Customer</div>
            </div>
            <div className="c-stat">
                <div className="c-stat-n">{data.provider}</div>
                <div className="c-stat-1">Provider</div>
            </div>
            <div className="c-stat">
                <div className="c-stat-n">10+</div>
                <div className="c-stat-1">Service Category</div>
            </div>
            <div className="c-stat">
                <div className="c-stat-n">{data.avgrate}</div>
                <div className="c-stat-1">Avg. Review</div>
            </div>
            <div className="c-stat">
                <div className="c-stat-n">{data.services}</div>
                <div className="c-stat-1">Services</div>
            </div>
        </div>
        <div className="c-slider">
            <div className="c-sec-head">
                <div>
                <div className="c-sec-eye">Browse</div>
                <div className="c-sec-title">Popular Categories</div>
                </div>
                
            </div>
            
        <Slider/>
        </div>
        <div class="providers-sec">
            <div class="sec-head">
                <div>
                    <div class="sec-eye">Top Rated</div>
                    <div class="sec-title">Popular Services</div>
                </div>
            </div>
            <div class="providers-grid">
            {sdata && sdata.map((item,index)=>{
                                    return(
                                        <div>
                                            <div className='hs-card' >
                                                <div className='hs-card-header'>
                                                    <p>{item.title}</p>
                                                    <span>{item.category}</span>
                                                </div>
                                                <div className='hs-card-meta'>
                                                    <div className='hs-meta'><SlUser/>{item.provider_name}</div>
                                                    <div className='hs-meta'><CiLocationOn/>{item.city}</div>
                                                </div>
                                                <div className='hs-bottom'>
                                                    <div className='hs-amount'>₹{item.price}<span>/{item.pricing_type === "hourly" ? "Hour" : "Visit"}</span></div>
                                                   <button className='hs-button' onClick={(e) => { e.stopPropagation(); booking(item._id); }} > Book Now</button>
                                            
                                                </div>
                                            </div>
                                        </div>    
                                    )
                                })}
                                </div>
        </div>
        
        <div className="c-hiw">
             <div style={{"text-align":"center"}}>
                <div className="c-sec-eye" style={{"text-align":"center"}}>Simple Process</div>
                <div className="c-sec-title">How It Works</div>
            </div>
            <div className="steps">
                <div className="c-step">
                    <div className="c-step-n">1</div>
                    <div className="c-step-t">Search a Service</div>
                    <div className="c-step-d">Browse by category and Title. Filter by City and price.</div>
                </div>
                <div className="c-step">
                    <div className="c-step-n">2</div>
                    <div className="c-step-t">Request Booking</div>
                    <div className="c-step-d">Pick a Date. The provider confirms within minutes.</div>
                </div>
                <div className="c-step">
                    <div className="c-step-n">3</div>
                    <div className="c-step-t">Get Served</div>
                    <div className="c-step-d">Professional arrives on time. Pay securely after the job is done.</div>
                </div>
            </div>
        </div>
        <div className="c-trusts">
            <div style={{"textAlign":"center"}}>
                <div className="c-sec-eye" style={{"text-align":"center"}}>Why Quickserve</div>
                <div className="c-sec-title">Built on Trust</div>
            </div>
            <div className="c-trust-grid">
                <div className="c-trust-card">
                    <div className="c-trust-icon">✅</div>
                    <div className="c-trust-title">Verified Professionals</div>
                    <div className="c-trust-desc">Every provider goes through identity verification, background checks, and skill assessments before joining.</div>
                </div>
                <div className="c-trust-card">
                    <div className="c-trust-icon">🔒</div>
                    <div className="c-trust-title">Secure Payments</div>
                    <div className="c-trust-desc">Pay only after the job is completed. UPI, cards, and wallets — all secured with end-to-end encryption.</div>
                </div>
                <div className="c-trust-card">
                    <div className="c-trust-icon">⭐</div>
                    <div className="c-trust-title">Ratings & Reviews</div>
                    <div className="c-trust-desc">Real reviews from real customers. Our rating system keeps providers accountable and quality high.</div>
                </div>
            </div>
        </div>
        <div className="c-review-sec">
             <div class="sec-head">
                <div class="sec-title">Review</div>
            </div>
           <div className="c-review-grid">
                        { rdata && rdata.map((item)=>(
                            <div className="c-review-card">
                            <div className="c-review-top">
                                <div className="c-reviewer">
                                    <div className="c-rev-av" style={{"background":"rgba(99,153,34,0.15)","color":"#639922"}}>{item.username?.toUpperCase().slice(0, 1) || ""}</div>
                                    <div>
                                        <div className="c-rev-name">{item.username}</div>
                                        <div className="c-rev-date"> {new Date(item.created_date).toLocaleString("en-US",{month: "long", year: "numeric"})}</div>
                                    </div>
                                </div>
                                <div style={{"color":"white"}}>{item.rate} ★</div>
                                
                            </div>
                            <p className="c-rev-text">{item.review}</p>
                        </div>
                        ))}
                    </div>
            
        </div>
            
       
        <Footercon/>
        </div>
    );
}

export default Homec;