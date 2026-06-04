import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import './handleservice.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogoSlack } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";


function Handleservice(){
    const navigate = useNavigate();
    const [activecount,setactivecount] = useState(0);
    const [accpetedcount,setaccpetedcount] = useState(0);
    const [data,setdata] = useState([]);
    
    const id =sessionStorage.getItem("uid")
    const user = JSON.parse(sessionStorage.getItem("user"));
    const list=async()=>{
        const res = await fetch("http://localhost:3002/listservices2?id="+id);
        const result = await res.json();
        console.log(result);
        setdata(result.data);
        setactivecount(parseInt(result.active));
        setaccpetedcount(parseInt(result.accpeted));
    }

    const edit=(sid)=>{
        sessionStorage.setItem("sid",sid);
        navigate('/editservice');
    }

    const remove=async(sid,)=>{
        console.log(sid);
        const response = await fetch("http://localhost:3002/removeservice?sid="+sid);
        const res2 = await response.json();
        alert("service Deleted Successfully");
        list();

    }
    const addservice=()=>{
        navigate('/addservice');
    }
    const sdetails=(sid,state)=>{
        sessionStorage.setItem("sid",sid);
        sessionStorage.setItem("state",state);
        navigate("/Servicedetail");

    }

    useEffect(()=>{
        list();
    },[])

    return(
        <div className='hs-maindiv'>
            <Headerpro/>
            <div className='hs-main-panel'>
                <div className='hs-heading'>
                    <div className='hs-title-row'>
                        <div className='hs-title'>Manage Service</div>
                        <span className='hs-badge'>Provider</span>
                        </div>
                        <button className='hs-add-btn' onClick={()=>addservice()} >+ Add new Service</button>
                </div>
                <div className='hs-meta'>View, edit and manage all your listed services</div>
                <div className='hs-state-section'>
                    <div className='hs-state-card'>
                        <div className='hs-state-logo' style={{"background-color": "#2dd4a520"}}>
                            <IoLogoSlack size={17} color="#2dd4a4"/>
                        </div>
                        <div >
                            <div className='hs-state-value'>{user.Services}</div>
                            <div className='hs-state-text'>Total Services</div>
                        </div>
                    </div>
                     <div className='hs-state-card'>
                        <div className='hs-state-logo' style={{"background-color": "rgba(99,153,34,0.1)"}}>
                            <IoMdCheckmarkCircleOutline size={17} color="#69ce2a"/>
                        </div>
                        <div>
                             <div className='hs-state-value'>{activecount}</div>
                            <div className='hs-state-text'>Active Services</div>
                        </div>
                    </div>
                    <div className='hs-state-card'>
                        <div className='hs-state-logo' style={{"background-color": "rgba(239,159,39,0.1)"}}>
                            <IoIosTimer size={17} color="#d4a22d"/>
                        </div>
                        <div >
                             <div className='hs-state-value'>{accpetedcount}</div>
                            <div className='hs-state-text'>Accpeted services</div>
                        </div>
                    </div>
                </div>
                    <div className='hs-table-section'>
                        <div className='hs-table-heading'>
                        <div className='hs-table-title'>Your Services</div>
                        <div className='hs-table-span'>{user.Services} listings</div>
                        </div>
                        <table className='hs-table'>
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
                                <th>Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item,index)=>(
                                    <tr onClick={()=>sdetails(item._id,1)}>
                                        <td><span className='hs-row-num'>{index+1}</span></td>
                                    
                                        <td>
                                            <div className='hs-row-name'>{item.title}</div>
                                           
                                        </td>
                                         <td><div>
                                            <div className='hs-row-name'>{item.category}</div>
                                            <div className='hs-row-cate'>{item.subcategory}</div></div>
                                        </td>
                                     
                                        <td><div className='hs-row-desc'>{item.decription}</div></td>
                                        <td><div className='hs-row-add'>{item.address}</div></td>
                                        <td><div className='hs-city-chip'><div className='hs-city-logo'><IoLocationOutline/></div>{item.city}</div></td>
                                        <td><div className={`hs-status ${item.status === "active" ? "active" : "inactive" }`}>
                                            <div className='hs-status-dot'></div>
                                            {item.status}
                                            </div>
                                        </td>
                                      
                                        <td><div><div className='hs-row-price'>{item.price}</div>
                                                <div className='hs-price-type'>{item.pricing_type}</div>
                                            </div>
                                        </td>
                                        <td><div className={`hs-approval ${item.approval_status === "accepted" ? "accepted" :  item.approval_status === "rejected" ? "rejected" : "pending" }`}>{item.approval_status}</div></td>
                                        <td >
                                            <div className='hs-actions'>
                                            <button className="hs-edit-btn"  onClick={()=>edit(item._id)}>
                                                <div className='hs-edit-logo' ><HiOutlinePencilAlt/></div>Edit</button>
                                            <button className="hs-del-btn" onClick={()=>remove(item._id)} >
                                                 <div className='hs-del-logo' ><FaRegTrashCan/></div>Delete</button>
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
export default Handleservice;