import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './SearchService.css';

import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlUser } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";

function SearchService(){

    const navigate = useNavigate();
    
    const [data,setdata] = useState([]);
    const [count,setcount] = useState("");
    const [search,setsearch] = useState("");
    const [fullsearch, setfullsearch] = useState(false);

    const [cityfilter,setcityfilter] = useState(false);
    const [pricefilter,setpricefilter] = useState(false);

    const [city,setcity] = useState("");
    const [minprice,setminprice] = useState("");
    const [maxprice,setmaxprice] = useState("");


    const [open,setopen] = useState(false);

    const dropdown=(e)=>{
        e.stopPropagation();
        setopen(!open);
    }

    const realtimesearch = (e)=>{
        setsearch(e.target.value);
    }

    const booking=(id)=>{
        sessionStorage.setItem("sid",id);
        navigate('/booking');

    }

    useEffect(()=>{
        function handleclickoutside(){
            setopen(false);
        }

        document.addEventListener("click",handleclickoutside);

        return()=>{
            document.removeEventListener("click",handleclickoutside)
        }
    },[])

    const handlesearch =async( searchvalue = search,full = false)=>{
         const json = {};

        if (search.trim() !== "") {
        json.search = search;
    }

         if (cityfilter && city){
            json.city = city;
         }

         if (pricefilter && (minprice || maxprice)){
            json.minprice = minprice;
            json.maxprice = maxprice;
         }

         if (!full) json.limit = 5;

        

         const res = await fetch("http://localhost:3002/search",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(json)
         });
         const services = await res.json();

            if (services.success === false) {
                alert("error searching");
                navigate('/chome');
            }

            else if (services.success === true) {
                console.log(services);
                setdata(services.data);
                setcount(services.total);

            }
            else {
                setdata([]);
            }
    }
    
    const sdetails=(sid,state)=>{
        sessionStorage.setItem("sid",sid);
        sessionStorage.setItem("state",state);
        navigate("/Servicedetail");

    }
    useEffect(()=>{
        const delay = setTimeout(() => {
            setfullsearch(false);
            handlesearch(search,false);
    }, 600); 

    return () => clearTimeout(delay);
    },[search]);
    useEffect(()=>{
        handlesearch(search,false);
    },[city, minprice, maxprice, cityfilter, pricefilter]);


    return(
        <div className='qs-maindiv'>
            <Headercon/>
            <div className='qs-main-panel'>
                <div className='qs-heading'>
                    <div className='qs-heading-left'>
                        Search <span>Service</span>
                        <p>Find Trusted Professional near you</p>
                   </div>
                    <div className='qs-right'>
                       <div className='qs-search'>
                            <FaSearch/>
                            <input type="text" placeholder='Search Service, Provider...' value={search} onChange={realtimesearch}></input>
                        </div>

                    <div className='qs-dropdown'>
                    <button className='qs-filter' onClick={dropdown}><FaFilter/> Filter</button>

                    <div className={`qs-dropdown-filter ${open ? "show" : "" }`}  onClick={(e) => e.stopPropagation()}>
                        filter by
                        <div className='qs-div-filter'>
                            
                            <input type="checkbox" checked={cityfilter} onChange={(e)=>setcityfilter(e.target.checked)}></input>
                            <label className='qs-label'>Filter By City</label>
                        </div>
                       
                        { cityfilter && <select className='qs-select' value={city} onChange={(e)=>setcity(e.target.value)}>
                            <option className='qs-option' value="">Select City</option>
                            <option className='qs-option' value="gandevi">Gandevi</option>
                            <option className='qs-option' value="navasri">Navsari</option>
                            <option className='qs-option' value="surat">Surat</option>
                            </select>}
                         <div className='qs-div-filter'>
                            <input type="checkbox" checked={pricefilter} onChange={(e)=>setpricefilter(e.target.checked)}></input>
                            <label className='qs-label'>Filter By Price</label>
                        </div>
                        {pricefilter &&
                        <div>
                            <label>Min Price: </label>
                            <input type="number" className='qs-price' value={minprice} onChange={(e)=>setminprice(e.target.value)}></input>
                            <label>Max Price: </label>
                            <input type="number" className='qs-price'  value={maxprice} onChange={(e)=>setmaxprice(e.target.value)}></input>
                        </div>}
                    </div>
                   
                    </div>
                    <button className='qs-search-btn' onClick={() => {
                                setfullsearch(true);
                                handlesearch(search, true);
                            }}><FaSearch/></button>
                    </div>
                </div>
                <div className='qs-result-header'>
                    <span>Showing all Results</span>
                    <span style={{"paddingLeft":"2rem","borderLeft":"1px solid rgba(255,255,255,0.1)"}}>{count}    service found </span>
                </div>

                <div className='qs-service'>
                    
                      {data.length === 0 && (
                        <p style={{textAlign:"center"}}>No services found</p>
                       )}
                    {data && data.map((item,index)=>{
                        return(
                            <div>
                                <div className='qs-card' onClick={()=>sdetails(item._id,0)}>
                                    <div className='qs-card-header'>
                                        <p>{item.title}</p>
                                        <span>{item.category}</span>
                                    </div>
                                    <div className='qs-card-meta'>
                                        <div className='qs-meta'><SlUser/>{item.provider_name}</div>
                                        <div className='qs-meta'><CiLocationOn/>{item.city}</div>
                                    </div>
                                    <div className='qs-bottom'>
                                        <div className='qs-amount'>₹{item.price}<span>/{item.pricing_type === "hourly" ? "Hour" : "Visit"}</span></div>
                                       <button className='qs-button'  onClick={(e) => { e.stopPropagation(); booking(item._id); }}> Book Now</button>
                                
                                    </div>
                                </div>
                            </div>    
                        )
                    })}
                    
                </div>
            </div>
            <Footercon/>

        </div>
    );
}
export default SearchService;