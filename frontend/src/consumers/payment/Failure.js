import Headercon from '../component/Headercon';
import Footercon from '../component/Footercon';
import './payment.css';

function Failure(){
    return(
        <div className='p-maindiv2'>
            <Headercon/>
             <div className='p-main-panel'>
            <div className='p-section' style={{"color":"white"}}>
                <h1>sorry</h1>
                <h2>Payment Unseccessfull</h2>
                <h2> Try Again</h2>
                <a href='/chome'className='p-link'syle>Back to Home</a>
            </div>
            </div>
            <Footercon/>
        </div>
    );
}
export default Failure;