import Headeradmin from '../component/Headeradmin';
import Menu from '../component/Menu';
import './Bookinglist.css';

import { useState,useEffect } from 'react';
function Bookinglist(){
    const [data,setdata] = useState([]);
    
        const listbooking = async()=>{
            const res = await fetch('http://localhost:3002/listbooking');
            const services = await res.json();
            console.log(services);
            setdata(services);
        }
    
        
        useEffect(()=>{
            listbooking();
        },[])
    return (
        <div className='bl-maindiv'>
            <Menu/>
            <div className='bl-maincontanier'>
                <Headeradmin/>
                 <div className='bl-page-wrap'>
                    <div className='bl-page-header'>
                        <div className='bl-page-tag'><span className='dot'/>Admin panel</div>
                        <div className='bl-page-title'>View <span>Booking</span> </div>
                        <p className="bl-page-sub">View and Monitor All  Booking</p>
                    </div>
                     <div className='bl-table-card'>
                        <div className='bl-table-wrap'>
                            <table className='bl-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>                        
                                        <th>Services</th>
                                        <th>Category</th>
                                        <th>Consumer Name</th>
                                        <th>Provider Name</th>
                                        <th>Address</th>
                                        <th>Payment Method</th>
                                        <th>Amount/hour</th>
                                        <th>Date</th>
                                        <th>Approval</th>
                                        <th>Complete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    data.map((item,index)=>(
                                        <tr>
                                            <td><span className='bl-row-num'>{index+1}</span></td>                                    
                                            <td>
                                                <div className='bl-row-name'>{item.title}</div>     
                                            </td>
                                            <td><div>
                                                <div style={{"color": "#4a5568"}}>{item.category}</div>
                                                <div className='bl-row-cate'>{item.subcategory}</div></div>
                                            </td>
                                             <td>
                                                <div className='bl-row-name' style={{"textAlign":"center"}}>{item.consumer_name}</div>     
                                            </td>
                                            <td style={{"color":"#4a5568","textAlign":"center"}}>{item.provider_name}</td>
                                            <td><div className='bl-row-add'>{item.address}</div></td>
                                            <td><div className={`bl-payment ${item.payment_method ===   "online" ? "online" : "cash"}`}>{item.payment_method}</div>
                                                   
                                            </td>       
                                            <td><div style={{"display":"flex"}}><div className='bl-row-amount'>{item.amount}/</div>
                                                <div className='bl-hour'>{item.hour} Hours</div>
                                                </div>
                                                <div className='bl-row-cate'>{item.payment_status}</div>
                                            </td>
                                            <td><div className='bl-row-date'>{new Date(item.date).toLocaleDateString("hi-IN")}</div></td>
                                            <td><div className={`bl-approval ${item.approval_status === "accepted" ? "accepted" :  item.approval_status === "rejected" ? "rejected" : "pending" }`}>{item.approval_status}</div></td>
                                            <td><div className={`bl-status ${item.status === "pending" ? "pending" : "completed"}`}>{item.status}</div></td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Bookinglist;