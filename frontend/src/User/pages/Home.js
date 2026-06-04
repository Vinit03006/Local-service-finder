import Header from "../component/Header";
import Footer from "../component/Footer";
import Heroslider from "../../common/Heroslider";
import { useNavigate } from "react-router-dom";
import Slider from "../../common/Slider";

import { FaCheck } from "react-icons/fa6";

import './home.css';

import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";


const images = ["/"]
function Home(){
    const navigate = useNavigate();
    const [data,setdata] = useState({});
    function login(){
        navigate("/login",{replace:true});
    }
    function Register(){
        navigate("/register",{replace:true});
    }

    const homedetails = async() =>{
        const res = await fetch("http://localhost:3002/home");
        const res2 = await res.json();
        setdata(res2);
        console.log(res2);
    }
    useEffect(()=>{
        homedetails();
    },[])

    return(
        <div className="homediv">
            <Header/>
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
        <div className="status-bar">
            <div className="stat">
                <div className="stat-n">{data.users}</div>
                <div className="stat-1">Customer</div>
            </div>
            <div className="stat">
                <div className="stat-n">{data.provider}</div>
                <div className="stat-1">Provider</div>
            </div>
            <div className="stat">
                <div className="stat-n">10+</div>
                <div className="stat-1">Service Category</div>
            </div>
            <div className="stat">
                <div className="stat-n">{data.avgrate}</div>
                <div className="stat-1">Avg. Review</div>
            </div>
            <div className="stat">
                <div className="stat-n">{data.services}</div>
                <div className="stat-1">Services</div>
            </div>
        </div>
        <div className="slider">
            <div className="sec-head">
                <div>
                <div className="sec-eye">Browse</div>
                <div className="sec-title">Popular Categories</div>
                </div>
                
            </div>
            
        <Slider/>
        </div>
        <div className="hiw">
             <div style={{"text-align":"center"}}>
                <div className="sec-eye" style={{"text-align":"center"}}>Simple Process</div>
                <div className="sec-title">How It Works</div>
            </div>
            <div className="steps">
                <div className="step">
                    <div className="step-n">1</div>
                    <div className="step-t">Search a Service</div>
                    <div className="step-d">Browse by category and Title. Filter by City and price.</div>
                </div>
                <div className="step">
                    <div className="step-n">2</div>
                    <div className="step-t">Request Booking</div>
                    <div className="step-d">Pick a Date. The provider confirms within minutes.</div>
                </div>
                <div className="step">
                    <div className="step-n">3</div>
                    <div className="step-t">Get Served</div>
                    <div className="step-d">Professional arrives on time. Pay securely after the job is done.</div>
                </div>
            </div>
        </div>
        <div className="trusts">
            <div style={{"textAlign":"center"}}>
                <div className="sec-eye" style={{"text-align":"center"}}>Why Quickserve</div>
                <div className="sec-title">Built on Trust</div>
            </div>
            <div className="trust-grid">
                <div className="trust-card">
                    <div className="trust-icon">✅</div>
                    <div className="trust-title">Verified Professionals</div>
                    <div className="trust-desc">Every provider goes through identity verification, background checks, and skill assessments before joining.</div>
                </div>
                <div className="trust-card">
                    <div className="trust-icon">🔒</div>
                    <div className="trust-title">Secure Payments</div>
                    <div className="trust-desc">Pay only after the job is completed. UPI, cards, and wallets — all secured with end-to-end encryption.</div>
                </div>
                <div className="trust-card">
                    <div className="trust-icon">⭐</div>
                    <div className="trust-title">Ratings & Reviews</div>
                    <div className="trust-desc">Real reviews from real customers. Our rating system keeps providers accountable and quality high.</div>
                </div>
            </div>
        </div>
        <div className="cta-sec">
            <div className="cta-card a">
                <h3>Need a Service Today?</h3>
                <p>Browse hundreds of verified professionals in your city and get your problem fixed fast.</p>
                <button className="btn-cta" onClick={Register}>Book Now →</button>
            </div>
            <div className="cta-card b">
                <h3>Are You a Provider?</h3>
                <p>Join QuickServe and grow your business. Reach thousands of customers — zero commission for 30 days.</p>
                <button className="btn-cta-outline" onClick={Register}>Join as Provider →</button>
            </div>
        </div>
            
       
        <Footer/>
        </div>
    );
}

export default Home;