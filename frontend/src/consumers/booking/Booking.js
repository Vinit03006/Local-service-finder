import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './Booking.css';

import { FaPager,FaLocationDot, FaRegPenToSquare  } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { FiCreditCard } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Booking(){
    const navigate = useNavigate();
 
    const [data,setdata] = useState([]);
    const [payment,setpayment] = useState("online");
    const sid = sessionStorage.getItem("sid");
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [description,setdescription] = useState("");
    const [date,setdate] = useState("");
    const [address,setaddress] = useState("");
    const [hour,sethour] = useState(1);
    const [amount,setamount]  = useState(0);
    

    const getdata=async()=>{
        console.log(sid);

        const res = await fetch('http://localhost:3002/getservice?id='+sid);
        const result = await res.json();
        console.log(result);
        if(result.success === false){
            alert("error");
        }
        else{
        setdata(result);
        }
    }

    useEffect(()=>{
        getdata();
    },[])

    const booking=async()=>{
        if(description === "" || date === "" || address === "" || hour === 0){
            alert("fill all details");
        }
        else{

            const getDayName = (date) => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const d = new Date(date);
            return days[d.getDay()];
            };
            
            const finalAmount = data.pricing_type === "hourly" ? parseInt(hour) * data.price : data.price;
        

            const day = date ? getDayName(date) : "";
            if(data.availability.includes(day)){

                
                const json = {consumer_id:user._id,consumer_name:user.username,provider_id:data.provider_id,
                provider_name:data.provider_name,service_id:data._id,title:data.title,category:data.category,
                description:description,address:address,city:data.city,date:new Date(date),hour:hour,amount:finalAmount,
                consumer_phone:user.contact,consumer_email:user.email,payment_method:payment,
                payment_status:"pending", approval_status:"Pending",status:"pending",review:"pending"};
                console.log(json);   
                
                const res = await fetch("http://localhost:3002/booking",{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(json)
                });
                const response = await res.json();
                if(response.success){
                    alert("Booking is done");
                    navigate('/chome');
                }
                else{
                    alert("error booking tray again");
                    navigate('/chome');
                }
            }
            else{
                alert("service not avaialbe on this day");
            }
        }
    }
    useEffect(() => {
    if (data?.price) {
        if (data.pricing_type === "hourly") {
            setamount(Number(hour) * data.price);
        } else {
            setamount(data.price);
        }
    }
}, [hour, data]);
    return(
        <div className='b-maindiv'>
            <Headercon/>
            <div className='b-main-panel'>
                <div className='b-title'>
                    Book <span>Service</span>
                </div>
                <div className='b-section'>
                    <div className='b-section-title'>
                        <span><FaPager/></span>
                        Service Details
                    </div>
                    <div className='b-row'>
                        <div className='b-name'>{data.title}</div>
                        <div className='b-meta'>
                            <div className='b-chip'>
                                <FaLocationDot/>
                                {data.city}
                            </div>
                             <div className='b-chip'>
                                <GoTag/>
                                {data.category}
                            </div>
                            <div className='b-chip'>
                                Sub-Category :&nbsp;{ data.subcategory}
                            </div>
                        </div>
                        <div className='b-provider-row'>
                             <div className='b-provider-logo'>{data.provider_name?.trim()?.charAt(0)?.toUpperCase() || "U"}</div>
                             <div>
                            <div className='b-provider-name'>{data.provider_name}</div>
                            <div className='b-chip'>Verified Provider</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='b-section'>
                    <div className='b-section-title'>
                        <span><FaRegPenToSquare/></span>
                        Description
                    </div>
                    <div className='b-field'>
                        <label className='b-label'>What Need To Done?</label>
                        <textarea className='b-input b-textarea' placeholder='eg.Ac is making much noise from fan' onChange={(e)=>{setdescription(e.target.value)}}></textarea>
                    </div>
                    <div className='b-field'>
                        <label className='b-label'>Pick A date</label>
                        <input className="b-input" type="date" onChange={(e)=>setdate(e.target.value)}></input>
                    </div>
                    <div className='b-field'>
                        <label className='b-label'>Address</label>
                        <input type="text" className='b-input'placeholder='e.g. Amalsad' onChange={(e)=>setaddress(e.target.value)}></input>
                    </div>
                </div>
                <div className='b-section'>
                    <div className='b-section-title'>
                        <span><FiCreditCard/></span>
                        Payment
                    </div>
                    <div className='b-pay-row'>
                        <div className='b-field2'>
                            <div className='b-label'>Total Hours</div>
                            <input type="number" className='b-input' onChange={(e)=>sethour(parseInt(e.target.value))}></input>
                        </div>
                         <div className='b-field2'>
                            <div className='b-label'>Amount</div>
                            <input className='b-input' type="number" min="1" value={amount}  disabled ></input>
                        </div>
                    </div>
                    <div className='b-pay-row'>
                        <div className={`b-pay-opt ${payment === "cash" ? 'selected' : ''}`} onClick={()=>setpayment("cash")}>
                            <div className='b-payment-logo'>
                                <BsCashCoin/>
                            </div>
                            <div className='b-pay-type'>Cash On Visit</div>
                            <div className='b-pay-sub'>Pay When Done</div>
                        </div>
                         <div className={`b-pay-opt ${payment === "online" ? 'selected' : ''}`} onClick={()=>setpayment("online")}>
                            <div className='b-payment-logo'>
                                <FiCreditCard/>
                            </div>
                            <div className='b-pay-type'>Online</div>
                            <div className='b-pay-sub'>Pay Now</div>
                        </div>

                    </div>


                </div>
                <div className='b-section'>
                    <div className='b-confirm-section'>
                        <button className='b-confirm' onClick={booking}>Booking</button>
                        <button className='b-cancel'>Cancel</button>
                    </div>

                    
                </div>
            </div>
            <Footercon/>
        </div>
    )
}

export default Booking;