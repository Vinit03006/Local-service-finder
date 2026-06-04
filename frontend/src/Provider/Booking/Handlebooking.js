import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import './handlebooking.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Handlebooking(){
    
    const [data,setdata] = useState([]);
    const pid =sessionStorage.getItem("uid")
    const list=async()=>{
        const res = await fetch("http://localhost:3002/bookinglist?pid="+pid);
        const result = await res.json();
        setdata(result);
        console.log(result);
    }

   const approve=async(id,stat)=>{
    try{
    const res2 = await fetch(`http://localhost:3002/approvebooking?bid=${id}&stat=${stat}&pid=${pid}`);
    const result2 = await res2.json();

    if (result2.success){
        alert(stat === 1 ? "service accepted" : "service rejected" );
        list();
    }
    else{
        alert("operation failed");
    }
   }
   catch(err){
    alert("server error");
   }
}
    useEffect(()=>{
        list();
    },[])

    return(
        <div className='hb-maindiv'>
            <Headerpro/>
            <div className='hb-main-panel'>
                <div className='hb-heading'>
                    <h1 className='hb-title'>Manage Booking</h1>
                    <span className='hb-badge'>Provider</span>
                    </div>
                    <div className='hb-meta'>Approve or Reject Your Bookings</div>
                    <div className='hb-table-section'>
                        <table className='hb-table'>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>service</th>
                                <th>Consumer</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>payment method</th>
                                <th>Amount / hour</th>
                                <th>Date</th>
                                <th>Approval</th>
                                <th>Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item,index)=>(
                                    <tr>
                                        <td><div className='hb-row-num'>{index+1}</div></td>
                                        <td><div>
                                                <div className='hb-row-name'>{item.title}</div>
                                                <div className='hb-row-cate'>{item.category}</div>
                                            </div></td>
                                        <td><div className='hb-name'>
                                                <div className='hb-name-logo'>{item.consumer_name.slice(0,1)}</div>
                                                <div className='hb-row-name'>{item.consumer_name}</div>
                                            </div>
                                        </td>
                                        <td><div className='hb-row-desc'>{item.description}</div></td>
                                        <td><div className='hb-row-add'>{item.address}</div></td>
                                         <td><div className={`hb-payment ${item.payment_method ===   "online" ? "online" : "cash"}`}>{item.payment_method}</div></td>
                                        <td><div>
                                                <div className='hb-row-amount'>{item.amount}</div>
                                                <div className='hb-hour'>{item.hour} Hours</div>
                                            </div>
                                        </td>
                                        <td><div className='hb-row-cate'>{new Date(item.date).toLocaleDateString("hi-IN")}</div></td>
                                        <td><div className={`hb-status ${item.approval_status === "pending" ? "pending" : item.approval_status === "accepted" ? "accepted" : "rejected"}`}>{item.approval_status}</div></td>  
                                        <td ><div style={{"display":"flex" , "gap": "10px"}}>
                                            <button className="hb-acc"  onClick={()=>approve(item._id,1)}>Accept</button>
                                            <button className="hb-rej" onClick={()=>approve(item._id,0)}>Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                </div>
            </div>
            <Footerpro/>
        </div> 
    );
}
export default Handlebooking;