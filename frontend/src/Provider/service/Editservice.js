import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



import './editservice.css';

function Editservice(){
    const [includes,setincludes] = useState([""]);
    const navigate = useNavigate();
    const [data,setdata] = useState([]);
    const[scity,setscity] = useState("");
    const[sdsc,setsdsc] = useState("");
    const[sadd,setsadd] = useState("");
    const [availabledays,setavailabledays] = useState([]);
    const [pricetype,setpricetype] = useState("fixed");
    const [price,setprice] = useState("");
    const [status,setstatus] = useState("active");
    const id = sessionStorage.getItem("uid");
    const serid = sessionStorage.getItem("sid");
    const handledaychange = (day)=>{
        if (availabledays.includes(day)){
            setavailabledays(availabledays.filter(d => d !== day));
        } else {
            setavailabledays([...availabledays,day]);
        }

    }
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    
    const getdata=async()=>{
        const get = await fetch('http://localhost:3002/getservice?id='+serid);
        const result = await get.json();
        setdata(result);
        setscity(result.city || "");
        setsdsc(result.decription || "");
        setsadd(result.address || "");
        setavailabledays(Array.isArray(result.availability) ? result.availability : []);
        setstatus(result.status || "active");
        setpricetype(result.pricing_type || "fixed");
        setprice(result.price || "");
        setincludes(Array.isArray(result.includes) ? result.includes : []);

    }

    const edit=async()=>{
        if( scity === "" ||sdsc === "" ||sadd === "" || availabledays.length === 0 ||  
            pricetype === "" || price === "" ||  status === "" ){
            alert("Fill All Details");
        }
        else{
        
            const json = {city:scity,decription:sdsc,address:sadd,availability:availabledays,status:status,pricing_type:pricetype,price:parseInt(price)};
            console.log(json);
            const response = await fetch("http://localhost:3002/editservice?id="+serid,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });
            const service = await response.json();
            if(service.success === false){
                alert("Error Editing service");
            }
            else{
                alert("Service edited sucessfully");
                navigate('/handleservice');
            }
        }
        
    }
    const cancel = () =>{
     setTimeout(() => {
             navigate('/handleservice');
        }, 1000);
    }
    useEffect(()=>{
        getdata();
    },[])
    return(
        <div className='es-maindiv'>
            <Headerpro/>
            <div className='es-main-panel'>
                <div className='es-heading'>
                    <h1>Edit Service</h1>
                    <span className='es-badge'>Provider</span>
                </div>
                <div className='es-form'>
                    <div className='es-form-section'>
                        <div className='es-section-title'>Basic Details</div>
                        <div className='es-grid-3'>
                            <div className='es-field'>
                                <label>Service Categories</label>
                                <div className='es-show'>{data.category}</div>
                            </div>
                            <div className='es-field'>
                                <label >Service Title</label>
                                <div className='es-show'>{data.title}</div>
                            </div>
                            <div className='es-field'>
                                <label>City</label>    
                                <select value={scity} onChange={(e)=>setscity(e.target.value)}>
                                    <option value="">Select City</option>
                                    <option value="Surat" >Surat</option>
                                    <option value="Gandevi">Gandevi</option>
                                    <option value="Navsari">Navsari</option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div className='as-form-section'>
                        <div className='as-section-title'>Service Details</div>
                        <div className='as-grid-custom'>
                            <div className='as-field'>
                                <label>Sub category</label>
                                <div className='es-show'>{data.subcategory}</div>
                                
                            </div>
                            <div className='as-field'>
                               
                                <label>What Included (Max 6)</label>                              
                                    {
                                        includes.length === 0 
                                        ? <div className='es-show'>No Data</div> 
                                        : includes.map((item, index) => (
                                            <div className='es-show' key={index}>{item}</div>
                                        ))
                                    }  
                            </div>
                        </div>
                    </div>
                     <div className='es-form-section'>
                        <div className='es-section-title'>Description & Location</div>
                        <div className='es-grid-2'>
                            <div className='es-field'>
                                <label>Service Description</label>
                                <textarea placeholder='Describe what your service includes...' value={sdsc} onChange={(e)=>setsdsc(e.target.value)}></textarea>
                            </div>
                            <div className='es-field'>
                                <label className='stext1'>Address</label>
                                <textarea placeholder='Enter Your Full Service Address..' value={sadd} onChange={(e)=>setsadd(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='es-form-section'>
                        <div className='es-section-title'>Availability</div>
                            <div className='es-days-row'>
                                <div className='es-days-chips'>
                                {days.map((day)=>(
                                        <div key={day} className={`as-chip ${availabledays.includes(day) ? "checked" : ""}`}
                                        onClick={()=>handledaychange(day)}
                                        >{day}</div>
                                    ))}
                                </div>
                            </div>
                        <div className='es-status-wrap'>
                            <span>Service Status</span>
                            <div className='es-status-pills'>
                                <div className={`es-spill active-pill ${status === "active" ? "selected" : ""} `}
                                onClick={()=>setstatus("active")}>
                                    Active
                                </div>
                                <div className={`es-spill inactive-pill ${status === "inactive" ? "selected" : ""} `}
                                onClick={()=>setstatus("inactive")}>
                                    InActive
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='es-form-section'>
                        <div className='es-section-title'>Pricing</div>
                        <div className='es-pricing-grid'>
                            <div className='es-field'>  
                                <label>Pricing Type</label>  
                                <div className='es-radio-card'>
                                    <div className={`es-rcard ${pricetype === "fixed" ? "selected" : ""}`}
                                    onClick={()=>setpricetype("fixed")}>
                                        <span className='as-rdot'></span>Fixed Price
                                    </div>
                                     <div className={`es-rcard ${pricetype === "hourly" ? "selected" : ""}`}
                                    onClick={()=>setpricetype("hourly")}>
                                        <span className='es-rdot'></span>Hourly Price
                                    </div>
                                </div>
                            </div>
                            <div className='es-field'>
                            <label>Service Price</label>
                            <div className='es-prefix-wrap'>
                                <span>$</span>
                                <input type='number' value={price}onChange={(e)=>setprice(e.target.value)} />
                            </div>
                        </div>       
                    </div>
                </div>
                <div className='es-form-footer'>
                    <button className='es-btn-primary' onClick={edit}  >Edit service</button>
                    <button className='es-btn-ghost' onClick={cancel}>Cancel</button>
                </div>
            </div>      
            </div>    
            <Footerpro />
        </div>
       
    );
}

export default Editservice;