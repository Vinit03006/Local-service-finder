import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import './react.css';
import reportWebVitals from './reportWebVitals';
//Main
import Home from './User/pages/Home';
import Login from './User/pages/Login';
import Register from './User/pages/Register';
import Forget from './User/pages/Forget';
import Forgetpassword from './User/pages/Forgetpass';
import Contactus from './User/component/Contactus';
import About from './User/component/About';
import Slider from './common/Slider';

//admin
import Adminhome from './Admin/pages/Adminhome';
import Aboutadmin from './Admin/component/Aboutadmin';
import Userlist from './Admin/Manage/Userlist';
import Profileadmin from './Admin/pages/Profileadmin';
import Email from './Admin/pages/Email';
import Editprofilead from './Admin/pages/Editprofilead';
import Changepassad from './Admin/pages/Changepassad';
import Request from './Admin/Manage/Request';
import Services from './Admin/Manage/Services';
import Generatepdf from './Admin/Manage/Generatepdf';
import Bookinglist from './Admin/Manage/Bookinglist';

//provider
import Homepro from './Provider/pages/Homepro';
import Profilepro from './Provider/pages/Profilepro';
import Editprofilepro from './Provider/pages/Editprofilepro';
import Addservice from './Provider/service/Addservice';
import Handleservice from './Provider/service/Handleservice';
import Changepassword from './Provider/pages/Changepassword';
import Editservice from './Provider/service/Editservice';
import Handlebooking from './Provider/Booking/Handlebooking';
import Workbooking from './Provider/Booking/Workbooking';
import Reviewr from './Provider/pages/Reviewr';
import Contactusp from './Provider/component/Contactusp';
import Aboutr from './Provider/component/Aboutr';
import ServiceDetails from './common/ServiceDetails';

//consumer
import Homec from './consumers/pages/Homec';
import Profilecon from './consumers/pages/Profilecon';
import Changepasswordcon from './consumers/pages/Changepasswordcon';
import Editprofilecon from './consumers/pages/Editprofilecon';
import SearchService from './consumers/booking/SearchService';
import Booking from './consumers/booking/Booking';
import MyBooking from './consumers/booking/MyBooking';
import Reviewc from './consumers/pages/Reviewc';
import Booking_status from './consumers/booking/Booking_status';
import Contactusc from './consumers/component/Contactusc';
import Aboutc from './consumers/component/Aboutc';
import Sreview from './consumers/booking/Sreview';

//payment
import Payment from './consumers/payment/Payment';
import Success from './consumers/payment/Success';
import Failure from './consumers/payment/Failure';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className='maindiv'>
    <Routes>
      {/* Main panel*/}
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/contactus" element={<Contactus/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/forget" element={<Forget/>}/>
      <Route path="/forgetpass" element={<Forgetpassword/>}/>
      <Route path="/slider" element={<Slider/>}/>

    {/*admin panel*/}
    <Route path="/adminhome" element={<Adminhome/>}/>
    <Route path="/aboutadmin" element={<Aboutadmin/>}/>
    <Route path="/userlist" element={<Userlist/>}/>
    <Route path="/profilead" element={<Profileadmin/>}/>
    <Route path="/changepassad" element={<Changepassad/>}/>
    <Route path="/editprofilead" element={<Editprofilead/>}/>
    <Route path="/email" element={<Email/>}/>
    <Route path="/requestservice" element={<Request/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/generatepdf" element={<Generatepdf/>}/>
    <Route path="/Bookinglist" element={<Bookinglist/>}/>

    {/*Provider Panel*/}
    <Route path="/prohome" element={<Homepro/>}/>
    <Route path="/proprofile" element={<Profilepro/>}/>
    <Route path="/peditprofile" element={<Editprofilepro/>}/>
    <Route path="/addservice" element={<Addservice/>}/>
    <Route path="/editservice" element={<Editservice/>}/>
    <Route path="/handleservice" element={<Handleservice/>}/>
    <Route path="/changepassword" element={<Changepassword/>}/>
    <Route path="/handlebooking" element={<Handlebooking/>}/>
    <Route path="/work" element={<Workbooking/>}/>
    <Route path="/reviewr" element={<Reviewr/>}/>
    <Route path="/contactr" element={<Contactusp/>}/>
    <Route path="/aboutr" element={<Aboutr/>}/>



    {/*Consumer Panel */}
    <Route path="/chome" element={<Homec/>}/>
    <Route path="/conprofile" element={<Profilecon/>}/>
    <Route path="/ceditprofile" element={<Editprofilecon/>}/>
    <Route path="/cchangepassword" element={<Changepasswordcon/>}/>
    <Route path="/search" element={<SearchService/>}/>
    <Route path="/booking" element={<Booking/>}/>
    <Route path="/Mybooking" element={<MyBooking/>}/>
    <Route path="/Reviewc" element={<Reviewc/>}/>
    <Route path="/booking_status" element={<Booking_status/>}/>
    <Route path="/contactusc" element={<Contactusc/>}/>
    <Route path="/aboutc" element={<Aboutc/>}/>
    <Route path="/Sreview" element={<Sreview/>}/>



    {/*Payment*/}
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/success" element={<Success/>}/>
    <Route path="/failure" element={<Failure/>}/>
    

    {/*common */}
    <Route path='/Servicedetail' element={<ServiceDetails/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
