import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './Booking_status.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Booking_status(){
    const navigate = useNavigate();

    const [approvedata,setapprovedata] = useState([]);
   
    const id =sessionStorage.getItem("uid")
    const list=async()=>{
        const res = await fetch("http://localhost:3002/handlebooking?cid="+id);
        const result = await res.json();
        if(result.success === false){
            alert("no Booking all Availble");
        }else{
        setapprovedata(result);
        }
    }

    const Delete = async(id)=>{
        const response = await fetch("http://localhost:3002/deletebooking?bid="+id);
        alert("Booking Deleted");
        list();

    }
    const payment=(id)=>{
        sessionStorage.setItem("bid",id);
        navigate('/payment');
    }

  
    useEffect(()=>{
        list();
    },[])

    return(
        <div className='bs-maindiv'>
            <Headercon/>
            <div className='bs-main-panel'>
                <div className='bs-heading'>
                    
                    <div className='bs-title'>Manage Booking</div>
                    <span className='bs-badge'>Consumer</span>
                </div>
                <div className='bs-meta'>Manage and Delete Your Booking</div>
                    <div className='bs-table-section'>
                        <table className='bs-table'>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Service</th>
                                <th>Provider</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>payment method</th>
                                <th>Amount / hour</th>
                                <th>Payment Status</th>
                                <th>approval status</th>
                                <th>Manage</th>
                                </tr>

                            </thead>
                            <tbody>
                            {
                                approvedata.map((item,index)=>(
                                    <tr>
                                        <td><div className='row-num'>{index+1}</div></td>
                                        <td><div>
                                                <div className='bs-row-name'>{item.title}</div>
                                                <div className='bs-row-cate'>{item.category}</div>
                                            </div>
                                        </td>
                                        <td><div className='bs-name'>
                                            <div className='bs-name-logo'>{item.provider_name.slice(0,2)}</div>
                                            <div className='bs-row-name'>{item.provider_name}</div>
                                            </div></td>
                                        <td><div className='bs-row-desc'>{item.description}</div></td>
                                        <td><div className='bs-row-add'>{item.address}</div></td>
                                        <td><div className={`bs-payment ${item.payment_method ===   "online" ? "online" : "cash"}`}>{item.payment_method}</div></td>
                                        <td><div>
                                            <div className='bs-row-amount'>{item.amount}</div>
                                            <div className='bs-hour'>{item.hour} Hours</div>

                                        </div></td>
                                        <td><div className='bs-row-name'>{item.payment_status}</div></td>
                                        <td><div className={`bs-status ${item.approval_status === "pending" ? "pending" : item.approval_status === "accepted" ? "accepted" : "rejected"}`}>{item.approval_status}</div></td>  
                                        <td>{item.approval_status === "accepted" ? (item.payment_status === "pending" ? <button className='bs-pay' onClick={()=>payment(item._id)}>Pay Now</button> : "") : <button className='bs-del' onClick={()=>Delete(item._id)}>Delete</button> }</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                </div>
                
            </div>
            <Footercon/>
        </div> 
    );
}

export default Booking_status;