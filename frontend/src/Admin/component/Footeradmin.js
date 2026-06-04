import { NavLink,useNavigate} from "react-router-dom";
import './footer.css';
function Footer(){
    const navigate = useNavigate();
    const year = new Date().getFullYear();
    function contact(){
        navigate("/contactus")

    }
    return(
        <div className="footer">
            <div className="footboxleft">
                <h2 >QuickServe</h2>
                <input type="button" className="button" value="Contact Us" onClick={contact}></input>
            </div>
            <div className="footboxmid">
                <h5 style={{"color":"white"}}>Quick Links</h5>
                <div className='footbox'>
                    <NavLink className="footlink" to='/'>home</NavLink>
                    <NavLink className="footlink" to='/'>Services</NavLink>
                    <NavLink className="footlink" to='/'>Booking</NavLink>
                    <NavLink className="footlink" to='/aboutadmin'>About</NavLink>
                </div>
                 <h5 className="text"> © {year} Local Service Finder | All Rights Reserved | Designed & Developed by Vinit Patel </h5>
            </div>
            <div className="divide"></div>
              <div className='footboxright'>  
          </div>

              
        </div>
    );
}
export default Footer;