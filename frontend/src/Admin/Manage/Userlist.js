import Headeradmin from '../component/Headeradmin';
import Menu from '../component/Menu';
import Generatepdf from '../Manage/Generatepdf';
import './userlist.css';

import { useEffect,useState } from 'react';

function Userlist(){

    const [open, setopen] = useState(false);
    const [data, setdata] = useState([]);
    const [counts, setCounts] = useState({});

    const list = async () => {
        try {
        const res = await fetch("http://localhost:3002/userlist");
        const json = await res.json();

        setdata(json);

        
        const result = countUserTypes(json);
        setCounts(result);

        } catch (err) {
        alert("failed to fetch data");
        }
    };

    const countUserTypes = (users) => {
        const counts = {
        consumer: 0,
        Admin: 0,
        Provider: 0,
        };

        users.forEach((user) => {
        if (counts[user.usertype] !== undefined) {
            counts[user.usertype]++;
        }
        });

        return counts;
    };

    const Delete=async(id)=>{
        const res = await fetch("http://localhost:3002/deleteuser?id="+id);
        const res2 = await res.json();
        if(res2.success === true){
        alert("user deleted successfully");
        list();
        }


    }
    
    useEffect(() => {
        list();
    }, []);

    return(
        <div className='ulmaindiv'>
            <Menu/>
            <div className='ulmaincontanier'>
                <Headeradmin/>

                <div className='ul-page-wrap'>
                    <div className='ul-page-header'>
                        <div className='ul-page-tag'><span className='dot'/>Admin panel</div>
                        <div style={{"display":"flex","justifyContent":"space-between"}}>
                            <div>
                                <div className='ul-page-title'>User<span>Directory</span> </div>
                                <p className="ul-page-sub">Manage and monitor all registered platform users</p>
                            </div>
                        <button className='ul-download' onClick={()=>setopen(true)}>Download PDF</button>
                        </div>
                        
                    </div>
                    <div className='ul-stats-row'>
                        <div className='ul-stat-chip'>
                            <span className='num'>{data.length}</span>
                            <span className='lbl'>Total User</span>
                        </div>
                         <div className='ul-stat-chip'>
                            <span className='num'>{counts.consumer}</span>
                            <span className='lbl'>Consumer</span>
                        </div>
                         <div className='ul-stat-chip'>
                            <span className='num'>{counts.Provider}</span>
                            <span className='lbl'>provider</span>
                        </div>
                    </div>
                    <div className='ul-table-card'>
                        <div className='ul-table-wrap'>
                            <table className='ul-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>UserName</th>
                                        <th>FullName</th>
                                        <th>Type</th>
                                        <th>City</th>
                                        <th>Address</th>
                                        <th>Conatct</th>
                                        <th>Email</th>
                                        <th>Created Date</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item,index)=>(
                                            <tr>
                                                <td><span className='ul-sr-num' >{index + 1}</span> </td>
                                                 <td>
                                                    <div className="ul-user-cell" style={{"maxWidth":"80px"}}>
                                                        <span className="ul-avatar">{item.username.toUpperCase().slice(0,1)}</span>
                                                        <span className="ul-user-name">{item.username}</span>
                                                    </div>
                                                </td>
                                                <td style={{"color": "#4a5568"}}>{item.fullname}</td>
                                                <td><div className={`ul-type-badge ${ item.usertype === "consumer" ? "consumer" : item.usertype === "Provider" ? "Provider" : "admin"}`}>{item.usertype}</div></td>
                                                <td>{item.city}</td>
                                                <td style={{ "maxWidth": "130px", "overflow": "hidden", "textOverflow": "ellipsis", "color": "#4a5568","textAlign":"left" }}>
                                                {item.address}
                                                </td>
                                                <td style={{ "fontFamily": "monospace", "fontSize": "0.82rem", "color": "#4a5568" }}>
                                                {item.contact}
                                                </td>
                                                <td className='ul-email-link' style={{"color": "#4b4ecf","maxWidth":"130px", "overflow": "hidden", "textOverflow": "ellipsis"}}>{item.email}</td>
                                                <td className='ul-date-cell'>{new Date(item.createdAt).toLocaleDateString("en-GB", {day: "numeric",month: "long",year: "numeric"})}</td>
                                                <td>
                                               
                                                <button className="ul-action-btn del" onClick={()=>Delete(item._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                    open && <div className='ul-overlay' onClick={()=>setopen(false)}>
                        <div className='ul-popup' onClick={(e)=>e.stopPropagation()}>
                            <div style={{"display":"flex","justifyContent":"flex-end"}}>
                                <button className="ad-cancel-btn"onClick={()=>setopen(false)}>
                                    X
                                </button> 
                            </div>
                             <div className='cm-popup-content'>
                                <Generatepdf/>
                            </div>

                        </div>
                    </div>

                }
                     
                </div>
               

            </div>

        </div>
    );
}

export default Userlist;