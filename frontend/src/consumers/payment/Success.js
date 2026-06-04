import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './payment.css';
import { useEffect, useState } from 'react';

function Success(){
    const [username,setusername] = useState();
    const [amount,setamount] = useState();
    const bid = sessionStorage.getItem("bid");

    const message=async()=>{
        setusername(sessionStorage.getItem("username"));
        setamount(sessionStorage.getItem("amount"));
        console.log(bid);
        

        const res = await fetch("http://localhost:3002/donepayment?bid="+bid);
        const result = await res.json();
        console.log(result);
        if (!result.success) {
            alert("Payment update failed");
        }
        
    }

    useEffect(()=>{
        message();
    },[]);

    return(
        <div className='p-maindiv2'>
            <Headercon/>
            <div className='p-main-panel'>
            <div className='p-section' style={{"color":"white"}}>
                <h1>Payment Sucess</h1>
                <h2>Thank you &nbsp; {username}</h2>
                <h2>Recieved Amount {amount}</h2>
                <a href='/chome'className='p-link'syle>Back to Home</a>
            </div>
            </div>
            <Footercon/>
        </div>
    );
}
export default Success;