import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



import './addservice.css';

function Addservice(){
    const navigate = useNavigate();

    const[scategory,setscategory] = useState("");
    const[subcate,setsubcate] = useState("");
    const [includes, setIncludes] = useState([""]);
    const[stitle,setstitle] = useState("");
    const[scity,setscity] = useState("");
    const[sdsc,setsdsc] = useState("");
    const[sadd,setsadd] = useState("");
    const [ availabledays,setavailabledays] = useState([]);
    const [pricetype,setpricetype] = useState("fixed");
    const [price,setprice] = useState("");
    const [status,setstatus] = useState("active");
    const id = sessionStorage.getItem("uid");
    const handledaychange = (day)=>{
        if (availabledays.includes(day)){
            setavailabledays(availabledays.filter(d => d !== day));
        } else {
            setavailabledays([...availabledays,day]);
        }

    }
    const Categories = ["Electrician","Mechanic","Cleaning","Ac Repair","Plumber","Painter","Carpenter","Tech Service","Moving & Delivery","Pet Service","Security Insallation"];
    const subcategories = {
        Electrician : ["Wriring & Rewriring","Fixture Installtion"],
        Mechanic : ["Bike Repair","Car Repair","heavy Vehicle"],
        Cleaning : ["Deep home Cleaning","Simple Cleaning"],
        "Ac Repair" : ["Ac service"],
        Plumber : ["Leakage fixing","Pipe Installtion"],
        Painter : ["Wall Painting","Interior Design"],
        Carpenter : ["Furniture Repair","Custom Furniture","Door work"],
        "Tech Service" : ["Laptop/Mobile repair","Home Networking"],
        "Moving & Delivery" : ["House Shifting"],
        "Pet Service" : ["Pet Grooming","pet Boarding"],
        "Security Insallation" : ["CCTV Install","Smart Lock Setup"]
    }
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    
    const handleIncludeChange = (index, value) => {
    const updated = [...includes];
    updated[index] = value;
    setIncludes(updated);
    };

    const addIncludeField = () => {
        if (includes.length < 6) {
            setIncludes([...includes, ""]);
        }
    };

    const removeIncludeField = (index) => {
        const updated = includes.filter((_, i) => i !== index);
        setIncludes(updated);
    };

    const addservice=async()=>{
        if(scategory === "" || stitle === "" || scity === "" || subcate === "" ||  includes.filter(i => i !== "").length === 0  ||sdsc === "" ||sadd === "" || availabledays.length === 0 ||  
            pricetype === "" || price === "" ||  status === "" ){
            alert("Fill All Details");
        }
        else{
        
            const json = {category:scategory,title:stitle,city:scity, subcategory:subcate,includes: includes.filter(item => item !== ""),decription:sdsc,address:sadd,
                          availability:availabledays,status:status,pricing_type:pricetype,price:parseInt(price),
                          createdAt: new Date().toISOString()};
            console.log(json);
            const response = await fetch("http://localhost:3002/addservice?id="+id,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(json)
            });
            const service = await response.json();
            if(service.success === false){
                alert("Error adding service");
            }
            else{
                alert("Service added sucessfully");
                navigate('/prohome');
            }
        }
        
    }
    const cancel = () =>{
     setTimeout(() => {
             navigate('/prohome');
        }, 1000);
    }
    return(
        <div className='as-maindiv'>
            <Headerpro/>
            <div className='as-main-panel'>
                <div className='as-heading'>
                    <h1>Add New Service</h1>
                    <span className='as-badge'>Provider</span>
                </div>
                <div className='as-form'>
                    <div className='as-form-section'>
                        <div className='as-section-title'>Basic Details</div>
                        <div className='as-grid-3'>
                            <div className='as-field'>
                                <label>Service Categories</label>
                                <select value={scategory} onChange={(e)=>setscategory(e.target.value)} >
                                <option value="">Select Category</option>
                                {
                                    Categories.map((item)=>(
                                        <option value={item} key={item}>{item}</option>
                                    ))
                                }
                            </select>
                            </div>
                            <div className='as-field'>
                                <label >Service Title</label>
                                <input type="text"  placeholder="e.g. AC Repair & Servicing" onChange={(e)=>setstitle(e.target.value)}></input>
                            </div>
                            <div className='as-field'>
                                <label>City</label>    
                                <select value={scity} onChange={(e)=>setscity(e.target.value)}>
                                    <option value="">Select City</option>
                                    <option value="Surat" >Surat</option>
                                    <option value="Gandevi">Gandevi</option>
                                    <option value="Navsari">Navsari</option>
                                    <option value="Bilimora">Bilimora</option>
                                    <option value="Varodara">Varodara</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='as-form-section'>
                        <div className='as-section-title'>Service Details</div>
                        <div className='as-grid-custom'>
                            <div className='as-field'>
                                <label>Sub category</label>
                                <select value={subcate} onChange={(e)=>setsubcate(e.target.value)}>
                                    <option value="">Select Sub Category</option>
                                    {scategory && subcategories[scategory]?.map((item)=>(
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='as-field'>
                                <div style={{"display":"flex","justifyContent":"space-between"}}>
                                <label>What Included (Max 6)</label>
                                {includes.length < 6 && (
                                    <button type="button"className='as-add-more' onClick={addIncludeField}>
                                        + Add More
                                    </button>
                                     )}
                                </div>

                                {includes.map((item, index) => (
                                    <div key={index} style={{display:"flex", gap:"10px", marginBottom:"8px"}}>
                                        <input 
                                            type="text"
                                            placeholder={`Include item ${index+1}`}
                                            value={item}
                                            onChange={(e)=>handleIncludeChange(index, e.target.value)}
                                        />
                                        {includes.length > 1 && (
                                            <button className="as-cancel" onClick={()=>removeIncludeField(index)}>X</button>
                                        )}
                                    </div>
                                ))}

                                
                               
                            </div>
                        </div>
                    </div>
                     <div className='as-form-section'>
                        <div className='as-section-title'>Description & Location</div>
                        <div className='as-grid-2'>
                            <div className='as-field'>
                                <label>Service Description</label>
                                <textarea placeholder='Describe what your service includes...' onChange={(e)=>setsdsc(e.target.value)}></textarea>
                            </div>
                            <div className='as-field'>
                                <label className='stext1'>Address</label>
                                <textarea placeholder='Enter Your Full Service Address..'  onChange={(e)=>setsadd(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='as-form-section'>
                        <div className='as-section-title'>Availability</div>
                            <div className='as-days-row'>
                                <div className='as-days-chips'>
                                {days.map((day)=>(
                                        <div key={day} className={`as-chip ${availabledays.includes(day) ? "checked" : ""}`}
                                        onClick={()=>handledaychange(day)}
                                        >{day}</div>
                                    ))}
                                </div>
                            </div>
                        <div className='as-status-wrap'>
                            <span>Service Status</span>
                            <div className='as-status-pills'>
                                <div className={`as-spill active-pill ${status === "active" ? "selected" : ""} `}
                                onClick={()=>setstatus("active")}>
                                    Active
                                </div>
                                <div className={`as-spill inactive-pill ${status === "inactive" ? "selected" : ""} `}
                                onClick={()=>setstatus("inactive")}>
                                    InActive
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='as-form-section'>
                        <div className='as-section-title'>Pricing</div>
                        <div className='as-pricing-grid'>
                            <div className='as-field'>  
                                <label>Pricing Type</label>  
                                <div className='as-radio-card'>
                                    <div className={`as-rcard ${pricetype === "fixed" ? "selected" : ""}`}
                                    onClick={()=>setpricetype("fixed")}>
                                        <span className='as-rdot'></span>Fixed Price
                                    </div>
                                     <div className={`as-rcard ${pricetype === "hourly" ? "selected" : ""}`}
                                    onClick={()=>setpricetype("hourly")}>
                                        <span className='as-rdot'></span>Hourly Price
                                    </div>
                                </div>
                            </div>
                            <div className='as-field'>
                            <label>Service Price</label>
                            <div className='as-prefix-wrap'>
                                <span>$</span>
                                <input type='number' onChange={(e)=>setprice(e.target.value)} />
                            </div>
                        </div>       
                    </div>
                </div>
                <div className='as-form-footer'>
                    <button className='as-btn-primary' onClick={addservice}>Add service</button>
                    <button className='as-btn-ghost' onClick={cancel}>Cancel</button>
                </div>
            </div>      
            </div>    
            <Footerpro />
        </div>
       
    );
}

export default Addservice;