import Headerpro from '../component/Headerpro';
import Footerpro from '../component/Footerpro';
import "./aboutr.css";

function Aboutr(){

return(
    <div className="maindiv">
        <Headerpro/>

<div className="about-main">
    <div className="about-hero">
        <h1>About QuickServe</h1>
        <p>
        QuickServe is designed to make finding reliable local services simple and convenient. Our platform connects consumers with skilled professionals such as electricians, plumbers, mechanics, and other service providers in their city.
        </p>
    </div>
    <div className="about-section">
        <h2>Our Mission</h2>
        <p>
        Our mission is to simplify the process of finding reliable local
        services. QuickServe helps consumers connect with skilled
        professionals quickly and efficiently.
        </p>
    </div>
    <div className="about-services">
        <h2>What We Offer</h2>
        <div className="service-cards">
            <div className="service-card">
                <h3>Easy Search</h3>
                <p>Find services by category and city.</p>
            </div>
            <div className="service-card">
                <h3>Trusted Providers</h3>
                <p>Connect with experienced local professionals.</p>
            </div>
            <div className="service-card">
                <h3>Quick Booking</h3>
                <p>Send service requests in just a few clicks.</p>
            </div>
            <div className="service-card">
                <h3>Status Tracking</h3>
                <p>Track service requests and booking status.</p>
            </div>
        </div>
    </div>
    <div className="about-section">
        <h2>How It Works</h2>
        <div className="steps">
            <div className="step">
                <h3>1</h3>
                <p>Search for a service provider.</p>
            </div>
            <div className="step">
                <h3>2</h3>
                <p>Send a service request.</p>
            </div>
            <div className="step">
                <h3>3</h3>
                <p>Provider accepts and completes the service.</p>
            </div>
        </div>
    </div>
</div>
<Footerpro/>
</div>
);
}
export default Aboutr;