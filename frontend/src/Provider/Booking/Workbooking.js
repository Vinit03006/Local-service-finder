import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import './Workbooking.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Workbooking(){
    const date =  new Date().toLocaleDateString("hi-IN");
    
    const [data,setdata] = useState([]);
    const id =sessionStorage.getItem("uid");
    const list=async()=>{
        const res = await fetch("http://localhost:3002/worklist?pid="+id);
        const result = await res.json();
        if(result.success === false){
            alert("no Booking all Availble");
        }else{
        setdata(result);
        }
    }

    const cbooking=async(bid)=>{
        const dbook = await fetch("http://localhost:3002/cbooking?bid="+bid +"&pid="+id);
        alert("Job is Complete");
        list();
    }

  
    useEffect(()=>{
        list();
        console.log(date);
    },[])

    return(
        <div className='wb-maindiv'>
            <Headerpro/>
            <div className='wb-main-panel'>
                <div className='wb-heading'>
                    <h1 className='wb-title'>Work Activities</h1>
                    <span className='wb-badge'>Provider</span>
                    </div>
                    <div className='wb-meta'>
                        See your Work Activities and Complete the job
                    </div>
                    <div className='wb-table-section'>
                        <table className='wb-table'>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>payment method</th>
                             
                                <th>Amount </th>
                                <th>Date</th>
                                <th>Payment Status</th>
                                <th>status</th>
                                <th>Completion</th>
                                </tr>

                            </thead>
                            <tbody>
                            {
                                data.map((item,index)=> {
                                    let date = new Date(item.date);
                                    date.setHours(0,0,0,0);
                                    let today = new Date();
                                    today.setHours(0,0,0,0);
                                  
                                    return(
                                    <tr>
                                        <td><div className='wb-row-num'>{index+1}</div></td>
                                         <td><div className='wb-name'>
                                                <div className='wb-name-logo'>{item.consumer_name.slice(0,1)}</div>
                                                <div className='wb-row-name'>{item.consumer_name}</div>
                                            </div>
                                        </td>
                                        <td><div>
                                                <div className='wb-row-name'>{item.title}</div>
                                                <div className='wb-row-cate'>{item.category}</div>
                                            </div></td>
                                       
                                        <td><div className='wb-row-desc'>{item.description}</div></td>
                                        <td><div className='wb-row-add'>{item.address}</div></td>
                                         <td><div className={`wb-payment ${item.payment_method ===   "online" ? "online" : "cash"}`}>{item.payment_method}</div></td>
                                        <td>
                                            <div>
                                                <div className='wb-row-amount'>{item.amount}</div>
                                                <div className='wb-hour'>{item.hour} Hours</div>
                                            </div>
                                        </td>
                                        <td><div className='wb-row-date'>{date.toLocaleDateString("hi-IN")}</div></td>
                                        <td><div className='wb-row-name'>{item.payment_status}</div></td>
                                        <td><div className={`wb-status ${item.status === "pending" ? "pending" : "completed"}`}>{item.status}</div></td>
                                       <td>{ item.status === "pending" ? (date.getTime() === today.getTime() ? <button className='wb-comp' onClick={()=>cbooking(item._id)}>Complete</button> :( date > today ? "Wait" : "Time over")) : "Complete"}</td>
                                    </tr>
                                )})
                            }
                            </tbody>
                        </table>
                </div>
            </div>
            <Footerpro/>
        </div> 
    );
}
export default Workbooking;