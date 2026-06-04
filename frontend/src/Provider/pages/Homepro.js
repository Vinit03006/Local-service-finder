import Headerpro from "../component/Headerpro";
import Footerpro from "../component/Footerpro";
import Slider from "../../common/Slider";
import Heroslider from "../../common/Heroslider";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import './homepro.css';
import { useState , useEffect } from "react";

function Homepro(){
    const navigate = useNavigate();
    const [data,setdata] = useState([]);
    const [sdata,setsdata] = useState([]);
    const [rdata,setrdata] = useState([]);
    const id = sessionStorage.getItem("uid");
    function login(){
        navigate("/login",{replace:true});
    }
    
     const homedetails = async() =>{
         const res = await fetch("http://localhost:3002/rhome?id="+id);
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
        <div className="p-maindiv">
            <Headerpro/>
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
                <div className="p-status-bar">
                    <div className="p-stat">
                        <div className="p-stat-n">+12K</div>
                        <div className="p-stat-1">Customer</div>
                    </div>
                    <div className="p-stat">
                        <div className="p-stat-n">943</div>
                        <div className="p-stat-1">Provider</div>
                    </div>
                    <div className="p-stat">
                        <div className="p-stat-n">13+</div>
                        <div className="p-stat-1">Service Category</div>
                    </div>
                    <div className="p-stat">
                        <div className="p-stat-n">4.8</div>
                        <div className="p-stat-1">Avg. Review</div>
                    </div>
                    <div className="p-stat">
                        <div className="p-stat-n">400+</div>
                        <div className="p-stat-1">Services</div>
                    </div>
                </div>
                <div className="p-slider">
                    <div className="p-sec-head">
                        <div>
                        <div className="p-sec-eye">Browse</div>
                        <div className="p-sec-title">Popular Categories</div>
                        </div>
                        
                    </div>
                    
                    <Slider/>
                </div>
                <div className="p-service-sec">
                    <div className="p-sec-head">
                        <div className="p-sec-title">Your Services</div>
                    </div>
                    <div className="p-table-section">
                        <table className='p-table'>
                            <thead>
                                <tr>
                                    <th>#</th>                        
                                        <th>Services</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th>Approval</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                sdata.map((item,index)=>(
                                    <tr>
                                        <td><span className='p-row-num'>{index+1}</span></td>
                                        <td>
                                            <div className='p-row-name'>{item.title}</div>    
                                        </td>
                                        <td><div>
                                            <div className='p-row-name'>{item.category}</div>
                                            <div className='p-row-cate'>{item.subcategory}</div></div>
                                        </td>
                                        <td><div className='p-row-desc'>{item.decription}</div></td>
                                        <td><div className='p-row-add'>{item.address}</div></td>
                                        <td><div className='p-city-chip'>{item.city}</div></td>
                                        <td><div className={`p-status ${item.status === "active" ? "active" : "inactive" }`}>
                                            <div className='p-status-dot'></div>
                                                {item.status}
                                            </div>
                                        </td>
                                        <td><div><div className='p-row-price'>{item.price}</div>
                                            <div className='p-price-type'>{item.pricing_type}</div>
                                            </div>
                                        </td>
                                        <td><div className={`p-approval ${item.approval_status === "accepted" ? "accepted" :  item.approval_status === "rejected" ? "rejected" : "pending" }`}>{item.approval_status}</div></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-hiw">
                    <div style={{"text-align":"center"}}>
                        <div className="p-sec-eye" style={{"text-align":"center"}}>Simple Process</div>
                        <div className="p-sec-title">How It Works</div>
                    </div>
                    <div className="steps">
                        <div className="p-step">
                            <div className="p-step-n">1</div>
                            <div className="p-step-t">Search a Service</div>
                            <div className="p-step-d">Browse by category and Title. Filter by City and price.</div>
                        </div>
                        <div className="p-step">
                            <div className="p-step-n">2</div>
                            <div className="p-step-t">Request Booking</div>
                            <div className="p-step-d">Pick a Date. The provider confirms within minutes.</div>
                        </div>
                        <div className="p-step">
                            <div className="p-step-n">3</div>
                            <div className="p-step-t">Get Served</div>
                            <div className="p-step-d">Professional arrives on time. Pay securely after the job is done.</div>
                        </div>
                    </div>
                </div>
                <div className="p-trusts">
                    <div style={{"textAlign":"center"}}>
                        <div className="p-sec-eye" style={{"text-align":"center"}}>Why Quickserve</div>
                        <div className="p-sec-title">Built on Trust</div>
                    </div>
                    <div className="p-trust-grid">
                        <div className="p-trust-card">
                            <div className="p-trust-icon">✅</div>
                            <div className="p-trust-title">Verified Professionals</div>
                            <div className="p-trust-desc">Every provider goes through identity verification, background checks, and skill assessments before joining.</div>
                        </div>
                        <div className="p-trust-card">
                            <div className="p-trust-icon">🔒</div>
                            <div className="p-trust-title">Secure Payments</div>
                            <div className="p-trust-desc">Pay only after the job is completed. UPI, cards, and wallets — all secured with end-to-end encryption.</div>
                        </div>
                        <div className="p-trust-card">
                            <div className="p-trust-icon">⭐</div>
                            <div className="p-trust-title">Ratings & Reviews</div>
                            <div className="p-trust-desc">Real reviews from real customers. Our rating system keeps providers accountable and quality high.</div>
                        </div>
                    </div>
                </div>
                 <div className="p-review-sec">
             <div class="sec-head">
                <div class="sec-title">Review</div>
            </div>
           <div className="p-review-grid">
                        { rdata && rdata.map((item)=>(
                            <div className="p-review-card">
                            <div className="p-review-top">
                                <div className="p-reviewer">
                                    <div className="p-rev-av" style={{"background":"rgba(99,153,34,0.15)","color":"#639922"}}>{item.username?.toUpperCase().slice(0, 1) || ""}</div>
                                    <div>
                                        <div className="p-rev-name">{item.username}</div>
                                        <div className="p-rev-date"> {new Date(item.created_date).toLocaleString("en-US",{month: "long", year: "numeric"})}</div>
                                    </div>
                                </div>
                                <div style={{"color":"white"}}>{item.rate} ★</div>
                                
                            </div>
                            <p className="p-rev-text">{item.review}</p>
                        </div>
                        ))}
                    </div>
            
        </div>
            <Footerpro/>
        </div>
    );
}

export default Homepro;