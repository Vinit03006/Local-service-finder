import { NavLink,useNavigate} from "react-router-dom";
import './footercon.css';
function Footercon(props){
    const navigate = useNavigate();
    const year = new Date().getFullYear();
    function contact(){
        navigate("/contactusc")

    }
    return(
        <div className="c-footer"  style={props.style}>
            <div className="c-div">
                <div className="c-left">
                    <div className="c-logo">Quick<span>Serve</span></div>
                    <p>Connecting you with Trusted local</p>
                    <div  className="c-span">Service professional</div>
                    <input type="button" className="c-button" value="Contact Us" onClick={contact}></input>
                </div>
                <div className="c-right">
                    <div className="c-right-heading">Quick Links</div>
                    <NavLink className="c-footlink" to='/chome'>home</NavLink>
                    <NavLink className="c-footlink" to='/search'>Services</NavLink>
                    <NavLink className="c-footlink" to='/Mybooking'>Booking</NavLink>
                    <NavLink className="c-footlink" to='/aboutc'>About</NavLink> 
                </div>
            </div>
            <div className="c-div1">
                <p>@ 2026 Local Service Finder - All Rights Reserved</p>
                <p>Designed & Developed By Vinit Patel</p>
            </div>
        </div>
    );
}
export default Footercon;