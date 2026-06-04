import { NavLink,useNavigate} from "react-router-dom";
import './footer.css';
function Footer(props){
    const navigate = useNavigate();
    const year = new Date().getFullYear();
    function contact(){
        navigate("/contactus")

    }
    return(
        <div className="p-footer"  style={props.style}>
            <div className="p-div">
                <div className="p-left">
                    <div className="p-logo">Quick<span>Serve</span></div>
                    <p>Connecting you with Trusted local</p>
                    <div  className="p-span">Service professional</div>
                    <input type="button" className="p-button" value="Contact Us" onClick={contact}></input>
                </div>
                <div className="p-right">
                    <div className="p-right-heading">Quick Links</div>
                    <NavLink className="p-footlink" to='/chome'>home</NavLink>
                    <NavLink className="p-footlink" to='/'>Services</NavLink>
                    <NavLink className="p-footlink" to='/'>Booking</NavLink>
                    <NavLink className="p-footlink" to='/'>About</NavLink> 
                </div>
            </div>
            <div className="p-div1">
                <p>@ 2026 Local Service Finder - All Rights Reserved</p>
                <p>Designed & Developed By Vinit Patel</p>
            </div>
        </div>
    );
}
export default Footer;