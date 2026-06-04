import { useState,useEffect } from "react";
import Headeradmin from "../component/Headeradmin";
import Menu from "../component/Menu";
import './request.css';

function Services(){
    const [data,setdata] = useState([]);

    const listservice = async()=>{
        const res = await fetch('http://localhost:3002/listservices');
        const services = await res.json();
        console.log(services);
        setdata(services);
    }

    
    useEffect(()=>{
        listservice();
    },[])
    return(
        <div className="rs-main-div">
            <Menu/>
            <div className="rs-main-panel">
                <Headeradmin/>
                 <div className='rs-page-wrap'>
                    <div className='rs-page-header'>
                        <div className='rs-page-tag'><span className='dot'/>Admin panel</div>
                        <div className='rs-page-title'>Manage <span>Services</span> </div>
                        <p className="rs-page-sub">Manage and Monitor All  Service Details</p>
                    </div>
                     <div className='rs-table-card'>
                        <div className='rs-table-wrap'>
                            <table className='rs-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>                        
                                        <th>Services</th>
                                        <th>Category</th>
                                        <th>Provider Name</th>
                                        <th>Description</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Status</th>
                                        <th>Price</th>
                                        <th>Approval</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    data.map((item,index)=>(
                                        <tr>
                                            <td><span className='rs-row-num'>{index+1}</span></td>                                    
                                            <td>
                                                <div className='rs-row-name'>{item.title}</div>     
                                            </td>
                                            <td><div>
                                                <div style={{"color": "#4a5568"}}>{item.category}</div>
                                                <div className='rs-row-cate'>{item.subcategory}</div></div>
                                            </td>
                                             <td>
                                                <div className='rs-row-name' style={{"textAlign":"center"}}>{item.provider_name}</div>     
                                            </td>
                                            <td><div className='rs-row-desc'>{item.decription}</div></td>
                                            <td><div className='rs-row-add'>{item.address}</div></td>
                                            <td className='rs-city-chip'>{item.city}</td>
                                            <td><div className={`rs-status ${item.status === "active" ? "active" : "inactive" }`}>
                                                <div className='rs-status-dot'></div>
                                                    {item.status}
                                                </div>
                                            </td>       
                                            <td><div><div className='rs-row-price'>{item.price}</div>
                                                        <div className='rs-price-type'>{item.pricing_type}</div>
                                            </div>
                                            </td>
                                            <td><div className={`rs-approval ${item.approval_status === "accepted" ? "accepted" :  item.approval_status === "rejected" ? "rejected" : "pending" }`}>{item.approval_status}</div></td>
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
    );
}
export default Services;