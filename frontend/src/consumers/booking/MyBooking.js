import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './Mybooking.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyBooking(){
    const navigate = useNavigate();

    const [approvedata,setapprovedata] = useState([]);
   
    const id =sessionStorage.getItem("uid")
    const list=async()=>{
        const res = await fetch("http://localhost:3002/mybooking?cid="+id);
        const result = await res.json();
        if(result.success === false){
            alert("no Booking all Availble");
        }else{
        setapprovedata(result);
        }
    }
    const review =(title,pname,sid)=>{
        sessionStorage.setItem("title",title);
        sessionStorage.setItem("pname",pname);
        sessionStorage.setItem("sid",sid);
        navigate('/Sreview');

    }



  
    useEffect(()=>{
        list();
    },[])

    return(
        <div className='mb-maindiv'>
            <Headercon/>
            <div className='mb-main-panel'>
                <div className='mb-heading'>
                    
                    <div className='mb-title'>My Booking</div>
                    <span className='mb-badge'>Consumer</span>
                </div>
               
                <div className='mb-meta'>Manage and Delete Your Booking</div>
                
                    <div className='mb-table-section'>
                        <table className='mb-table'>
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
                                <th>status</th>
                                </tr>

                            </thead>
                            <tbody>
                            {
                                approvedata.map((item,index)=>(
                                    <tr>
                                        <td><div className='row-num'>{index+1}</div></td>
                                        <td><div>
                                                <div className='mb-row-name'>{item.title}</div>
                                                <div className='mb-row-cate'>{item.category}</div>
                                            </div>
                                        </td>
                                        <td><div className='mb-name'>
                                            <div className='mb-name-logo'>{item.provider_name.slice(0,2)}</div>
                                            <div className='mb-row-name'>{item.provider_name}</div>
                                            </div></td>
                                        <td><div className='mb-row-desc'>{item.description}</div></td>
                                        <td><div className='mb-row-add'>{item.address}</div></td>
                                        <td><div className={`mb-payment ${item.payment_method === "online" ? "online" : "cash"}`}>{item.payment_method}</div></td>
                                        <td><div>
                                            <div className='mb-row-amount'>{item.amount}</div>
                                            <div className='mb-hour'>{item.hour} Hours</div>

                                        </div></td>
                                        <td><div className='mb-row-name'>{item.payment_status}</div></td>
                                        <td>{item.status === "pending" ? <div className='mb-status-pending'>{item.status}</div> :
                                             item.review === "pending" ? <button className = "mb-review" onClick={()=>review(item.title,item.provider_name,item._id)}>Review</button> : <div className='mb-status-completed'>{item.status}</div>}</td>  
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

export default MyBooking;