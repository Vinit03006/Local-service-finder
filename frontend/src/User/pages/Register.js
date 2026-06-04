import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import axios from 'axios';

function Register(){
    const [msg,setmsg] = useState("");
    const navigate = useNavigate();
    const [username,setusername] = useState("");
    const [firstname,setfirstname] = useState("");
    const [Lastname,setlastname] = useState("");
    const [password,setpassword] = useState("");
    const [address,setaddress] = useState("");
    const [usertype,setusertype] = useState("");
    const [city,setcity] = useState("");
    const [contact,setcontact] = useState("");
    const [email,setemail] = useState("");
    const [fname,setfname] = useState();



    async function insert(){
        console.log("hello");
        if (username === "" || firstname === "" || Lastname === "" || password === "" || address === "" || city === "" || usertype === "" || contact === "" || email===""){
            alert("fill all field");

        }else{
        
       
        var filename = fname.name;
        let json ={username,"fullname":firstname +" "+Lastname,password,address,usertype,city,"contact":parseInt(contact),email,filename,createdAt: new Date().toISOString()};
        if(usertype === "Provider"){
             json = {...json , Services:0,Pending_request:0,Compeleted_booking:0};
        }

        
        
        console.log(json);
        const response = await fetch("http://localhost:3002/register",{
        method : 'POST',
        headers : {'Accept':'application/json','Content-Type':'application/json'},
        body : JSON.stringify(json)
    });
     const user = await response.json();
    if (user.success === false){
        setmsg("Username already Taken");
    }
    else{
        const formData = new FormData();
        formData.append('file',fname);
        axios.post('http://localhost:3002/uploadfile',formData)
        .then(function (response){
            var msg=JSON.stringify(response.data);
            setmsg(msg);
            console.log(user);
            alert("data added to database");
            navigate('/login',{replace:true});
        })
        .catch(function (error) {
            console.log(error);
            
        });
       
    }
    }}
   
    
    return(
        <div className="regi-maindiv">
            <Header/>
                    <div className="page-wrap">
                        
                        <div className="right-panel">
                            <div className="form-card">
                                <h2 className="form-title">Create account</h2>
                                <p className="form-subtitle">
                                Already have one? <a href="#">Sign in →</a>
                                </p>
                    
                                
                                <div className="field-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={(e)=>setusername(e.target.value)}
                                    placeholder="e.g. Vinit patel"
                                />
                                </div>
                    
                            
                                <div className="field-row">
                                <div>
                                    <label>First Name</label>
                                    <input type="text" name="firstName"onChange={(e)=>setfirstname(e.target.value)} placeholder="Vinit" />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" onChange={(e)=>setlastname(e.target.value)} placeholder="Patel" />
                                </div>
                                </div>
                    
                            
                                <div className="field-group">
                                <label>Password</label>
                                <div className="input-wrap">
                                    <input
                                    type="password"
                
                                    
                                    onChange={(e)=>setpassword(e.target.value)}
                                    placeholder="Min. 8 characters"
                                    style={{ paddingRight: "44px" }}
                                    />
                                </div>
                                </div>
                    
                            
                                <div className="field-group">
                                <label>Address</label>
                                <textarea name="address" onChange={(e)=>setaddress(e.target.value)} placeholder="Street, Area..." />
                                </div>
                    
                        
                                <div className="field-row">
                                <div>
                                    <label>User Type</label>
                                    <select name="usertype"  onChange={(e)=>setusertype(e.target.value)}>
                                    <option value="consumer">Consumer</option>
                                    <option value="Provider">Provider</option>
                                    </select>
                                </div>
                                <div>
                                    <label>City</label>
                                    <select name="city"  onChange={(e)=>setcity(e.target.value)}>
                                    <option value="">Select City</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Bilimora">Bilimora</option>
                                    <option value="Valsad">Valsad</option>
                                    <option value="Navasri">Navsari</option>
                                    <option value="Varodara">Varodara</option>
                                    <option value="Ahmedabad">Ahemdabad</option>
                                    </select>
                                </div>
                                </div>
                    
                                <div className="field-row">
                                <div>
                                    <label>Contact No.</label>
                                    <input type="tel" name="contactNo"  onChange={(e)=>setcontact(e.target.value)} placeholder="+91 98765 43210" />
                                </div>
                                <div>
                                    <label>Email ID</label>
                                    <input type="email" name="email"  onChange={(e)=>setemail(e.target.value)} placeholder="vinit@email.com" />
                                </div>
                                </div>
                    
                        
                                <div className="field-group">
                                <label>Profile Image</label>
                                
                                 
                                <input type="file" className="file" onChange={(e)=>setfname(e.target.files[0])}></input>
                             
                    
                                <hr className="divider" />
                    
                                <button className="btn-submit"  onClick={insert}>Create My Account →</button>
                                <button className="btn-cancel" onClick={()=>{navigate('/')}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    );
}

export default Register;