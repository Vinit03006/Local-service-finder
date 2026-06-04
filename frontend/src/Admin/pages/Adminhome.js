import Headeradmin from "../component/Headeradmin";
import Menu from "../component/Menu";
import './admin.css';

import { BiGridAlt } from "react-icons/bi";
import { FaRegUser,FaHome  } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";

import { Chart } from "react-google-charts";
function Adminhome(){
    const [userdata,setuserdata] = useState([]);
    const [data,setdata] = useState([]);
    const [bdata,setbdata] = useState([]);
    const [chartData, setChartData] = useState([]);

    const list1 = async()=>{
        const list = await fetch("http://localhost:3002/aduserlist");
        const res = await list.json();
        setuserdata(res.userlist);
        setdata(res.info);
        setbdata(res.booking);
        console.log(res.userlist);
        setChartData([
            ["users", "count"],
            ["consumer", res.info.consumer],
            ["provider", res.info.provider]
        ]);
    }
    
    const options = {
    title: "Users",
    };

    useEffect(()=>{
        list1();
    },[])
    return(
        <div className="ad-maindiv">
            <Menu/>
            <div className="maincontanier1">
                <Headeradmin/>
                
                <div className="adminbox">
                    <div className="ad-grid-4">
                        <div className="ad-state-card" style={{ "background": "#a1c6f7"}}>
                            <div className="ad-state-icon" ><FaRegUser size="18" color="#043f9d"/></div>
                            <div className="ad-state-label">Total User</div>
                            <div className="ad-state-value">{data.user}</div>
                        </div>
                        <div className="ad-state-card" style={{ "background": "#97e7cf"}}>
                            <div className="ad-state-icon" ><FaHome size="18" color="#0d9488"/></div>
                            <div className="ad-state-label">Total Provider</div>
                            <div className="ad-state-value">{data.provider}</div>
                        </div>
                        <div className="ad-state-card" style={{  "background": "#bb98dd"}}>
                            <div className="ad-state-icon" ><BiGridAlt size="18" color= "#8b5cf6"/></div>
                            <div className="ad-state-label">Total Service</div>
                            <div className="ad-state-value">{data.services}</div>
                        </div>
                        <div className="ad-state-card" style={{ "background": "#d1bb9f"}}>
                            <div className="ad-state-icon" ><CiCalendar size="18" color="#f97316"/></div>
                            <div className="ad-state-label">Total Booking</div>
                            <div className="ad-state-value">{data.booking}</div>
                        </div>
                    </div>
                    <div className="ad-grid-2">
                        <div className="ad-table-div">
                            <div className="ad-table-title">User List</div>
                            <table className="ad-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>UserName</th>
                                        <th>UserType</th>
                                        <th>Address</th>
                                        <th>contact</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userdata.map((item,index)=>(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td><div className={`ad-usertype ${item.usertype === "consumer" ?  "consumer" : item.usertype === "Provider" ? "provider" : "admin" }`}>{item.usertype}</div></td>
                                            <td>{item.city}</td>
                                            <td>{item.contact}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                        
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="ad-chart-div">
                             <Chart
                                chartType="PieChart"
                                data={chartData}
                                options={options}
                                width={"100%"}
                                height={"400px"}
                                />
                        </div>
                    </div>
                    <div className="ad-table-div" style={{"marginTop":"20px"}}>
                            <div className="ad-table-title">Booking List</div>
                            <table className="ad-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>title</th>
                                        <th>consumer</th>
                                        <th>provider</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bdata.map((item,index)=>(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.consumer_name}</td>
                                            <td>{item.provider_name}</td>
                                            <td>{new Date(item.date).toLocaleDateString("hi-IN")}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                        
                                    ))}

                                </tbody>
                            </table>
                        </div>
                </div>

            </div>
        </div>
    );
}
export default Adminhome;