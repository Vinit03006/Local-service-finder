import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './payment.css';
import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';

import { SlUser } from "react-icons/sl";


function Payment(){
    const navigate = useNavigate();

    const bid = sessionStorage.getItem("bid");
    const [bdata,setbdata] = useState([]);

    const [firstname] = useState(sessionStorage.getItem("uname"));
   
    const [provider_name,setprovider_name] = useState("");
    const [email] = useState(sessionStorage.getItem("email"));
    const [phone] = useState(sessionStorage.getItem("phone"));
    
    
    const cancel = () =>{
        navigate('/chome');
    }

    const getdata=async()=>{
        const res3 = await fetch("http://localhost:3002/getbooking?bid="+bid);
        const booking = await res3.json();
        setbdata(booking);

    }

    useEffect(()=>{
        getdata();
    },[]);
    const handlepayment = async()=>{
       
            try{
            var dt = {firstname,title:bdata.title,provider_name:bdata.provider_name,email,phone,amount:bdata.amount};
            console.log(dt);
            sessionStorage.setItem("username",firstname);
            sessionStorage.setItem("amount",bdata.amount);
            const response = await fetch("http://localhost:3002/payment",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(dt)
            });
            const json = await response.json();
            var url = json.payu_url;
            var data = json.params;
            const form = document.createElement("form");
            form.method = "POST";
            form.action = url;
            form.target = "_self";

            Object.keys(data).forEach(key =>{
                const input = document.createElement("input");
                input.type = "hidden";input.name= key;input.value = data[key];form.appendChild(input);
            });
            document.body.appendChild(form);
            form.submit(); 
        }
        catch(err){
            alert("error");
        }
        
    
    }


    return(
        <div className='p-maindiv2'>
            <Headercon/>
            <div className='p-main-panel'>
                <div className='p-heading'>
                    <h1>Payment</h1>
                    <span className='p-badge'>Consumer</span>
                </div>
                <div className='p-grid-section'>
                    <div className='p-column-section'>
                        <div className='p-section'>
                            <div className='p-section-title'>
                                Basic Details
                            </div>
                            <div className='p-grid-row'>
                                <div className='p-name'>
                                    <label>UserName </label> 
                                    <input type="text" value={bdata.consumer_name} disabled></input> 
                                </div>
                                <div className='p-name'>
                                    <label>Email </label> 
                                    <input type="text" value={bdata.consumer_email} disabled></input> 
                                </div>
                            </div>
                            <div className='p-name'>
                                <label>Phone</label>
                                <input type="text" style={{"width":"35%"}}value={bdata.consumer_phone} disabled></input>
                            </div>
                        </div>  
                        <div className='p-section'>
                            <div className='p-section-title'>
                                service Details
                            </div>
                            <div className='p-grid-row'>
                                <div className='p-name'>
                                    <label>Service Title</label>
                                    <input type="text" value={bdata.title} disabled></input>
                                </div>
                                <div className='p-name'>
                                    <label>Service Category</label>
                                    <input type="text" value={bdata.category} disabled></input>
                                </div>
                            </div>
                            <div className='p-grid-row'>
                                <div className='p-name'>
                                    <label>Provider Name</label>
                                    <input type="text"  value={bdata.provider_name} disabled></input>
                                </div>
                                <div className='p-name'>
                                    <label>City</label>
                                    <input type="text" value={bdata.city} disabled></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-section'>
                        <div className='p-section-title'>
                            Booking Details
                        </div>
                        <div className='p-row'>
                            <div className='p-name'>
                                <label>Booking Description</label>
                                <textarea style={{"width":"100%"}} value={bdata.description} disabled></textarea>
                            </div>
                        </div>
                        <div className='p-row'>
                            <div className='p-name'>
                                <label>Address</label>
                                <textarea style={{"width":"100%"}} value={bdata.address} disabled></textarea>
                            </div>
                        </div>  
                        <div className='p-section-title'style={{"marginTop":"32px"}}>
                            Date & Price
                        </div>  
                        <div className='p-grid-row'>
                            <div className='p-name'>
                                <label>Date</label>
                                <input type="date" value={bdata.date} disabled/>
                            </div>
                            <div className='p-name'>
                                <label>Hour</label>
                                <input type="number" value={bdata.hour} disabled/>
                            </div>
                        </div> 
                        <div className='p-name'>
                                <label>Amount</label>
                                <input type="number" style={{"width":"35%"}}value={bdata.amount} disabled/>
                        </div> 
                                  
                    </div>  
                </div>
                <div className='p-btn-section'>
                <button className='p-btn1' onClick={handlepayment}>Payment</button>
                <button className='p-btn2' onClick={cancel}>cancel</button>
            </div>

            </div>

            <Footercon/>
        </div>
    );
}
export default Payment;