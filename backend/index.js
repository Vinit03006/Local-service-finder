const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const crypto = require('crypto');

require("dotenv").config();
const port=3002;
const {MongoClient,ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbname = "database";

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors());
app.use('/profileimages',express.static('profileimages'));
const MERCHANT_KEY = "d2iFg1";
const SALT = "4ZV08VmxxUEuGkpC1rSzCd1lGid7etbP";
client.connect();


app.get('/home',async(req,res)=>{
    const db = client.db(dbname);
    const collection = await db.collection("users");
    const scollection = await db.collection("services");
    const rcollection = await db.collection("reviews");
    const total = await collection.countDocuments();
    const services = await scollection.countDocuments();
    const provider = await collection.countDocuments({usertype : "Provider"});

    const result = await rcollection.aggregate([{$group:{ _id:null,avgRating:{ $avg:"$rate"}}}]).toArray();
    const avg = result[0]?.avgRating || 0;
    res.json({users:total,services:services,provider:provider,avgrate:avg});
    res.end();
})
app.get('/chome',async(req,res)=>{
    const db = client.db(dbname);
    const collection = await db.collection("users");
    const scollection = await db.collection("services");
    const rcollection = await db.collection("reviews");
    const total = await collection.countDocuments();
    const services = await scollection.countDocuments();
    const provider = await collection.countDocuments({usertype : "Provider"});

    const review = await rcollection.find().limit(4).toArray();
    const sdetails = await scollection.find({}).limit(4).toArray();

    const result = await rcollection.aggregate([{$group:{ _id:null,avgRating:{ $avg:"$rate"}}}]).toArray();
    const avg = result[0]?.avgRating || 0;
    res.json({users:total,services:services,provider:provider,avgrate:avg,review:review,sdetails:sdetails});
    res.end();
})
app.get('/rhome',async(req,res)=>{
    const id = req.query.id;
    const db = client.db(dbname);
    const collection = await db.collection("users");
    const scollection = await db.collection("services");
    const rcollection = await db.collection("reviews");
    const total = await collection.countDocuments();
    const services = await scollection.countDocuments();
    const provider = await collection.countDocuments({usertype : "Provider"});

    const review = await rcollection.find().limit(4).toArray();
    const sdetails = await scollection.find({provider_id:new ObjectId(id)}).limit(4).toArray();

    const result = await rcollection.aggregate([{$group:{ _id:null,avgRating:{ $avg:"$rate"}}}]).toArray();
    const avg = result[0]?.avgRating || 0;
    res.json({users:total,services:services,provider:provider,avgrate:avg,review:review,sdetails:sdetails});
    res.end();
})

app.post('/register', async (req,res)=>{
    let json = req.body;
    const db = client.db(dbname);
    let user = req.body.username;
    const collection = await db.collection("users");
    const checkuser = await collection.findOne({"username":user},{"username":1,"_id":0});
    if (checkuser){
        res.json({success:false});
    }
    else{
        const adduser = await collection.insertOne(json);
        res.send(adduser);
    }
    res.end();
})

app.get('/login',async(req,res)=>{
    const user = req.query.user;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const checkuser = await collection.findOne({"username":user});
    if(checkuser){
        res.send(checkuser);
    }
    else{
        res.json({"success":false});
    }
    res.end();
})

app.get('/forgot',async(req,res)=>{
    const user = req.query.user;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const checkuser = await collection.findOne({"username":user},{projection : {password:1,email:1}});
    if(checkuser){
     try{
            const message = user +",Your Password is : " + checkuser.password;
            const mailoption = {
                from: process.env.EMAIL_USER,
                to: checkuser.email,
                subject: "Forget Password",
                text : message
            };
            await transporter.sendMail(mailoption);
            res.status(200).json({
                success:true,
                message:"password sent sucessfully"
            });
        }
        catch(error){
            res.status(500).json({
                success:false,
                message: error.message
            })
        }
    }
    else{
        res.json({message:"user not found"});
    }
})

app.post('/reset',async(req,res)=>{
    const id = req.query.id;
    const pass = req.body.pass;
    const db = client.db(dbname);
    const collection = db.collection("users");
    await collection.updateOne({_id:new ObjectId(id)},{$set:{password:pass}});
    res.end();
    
})


app.get('/checkpass',async(req,res)=>{
    const id = req.query.id;
    const pass = req.query.pass;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const result = await collection.findOne({$and:[{_id:new ObjectId(id)},{password:pass}]});
    if(result){
        res.json({success:true});
    }
    else{
        res.json({success:false});
    }
})

app.get('/changepass',async(req,res)=>{
    const id = req.query.id;
    const pass = req.query.pass;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const result = await collection.updateOne({_id : new ObjectId(id)},{$set:{password:pass}});
    res.end();   
})



app.get('/userlist',async(req,res)=>{
    const db = client.db(dbname);
    const collection = db.collection("users");
    const result = await  collection.find().toArray();
    res.send(result);
    res.end();
})

app.get('/profile',async(req,res)=>{
    const id = req.query.id;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const result = await collection.findOne({_id:new ObjectId(id)});
    res.send(result);
})
app.get("/deleteuser",async(req,res)=>{
     const id = req.query.id;
    const db = client.db(dbname);
    console.log(id);
    const collection = db.collection("users");
    const result = await collection.deleteOne({_id:new ObjectId(id)});
    res.json({success:true});
    res.end();


})

app.post('/editprofile',async(req,res)=>{
    const id = req.query.id;
    const json = req.body;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const result = await collection.updateOne({_id:new ObjectId(id)},{$set:json});
   
    res.end();
})

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/sendemail",async(req,res)=>{
    try{
        const {emailto,subject,message} = req.body;

        const mailoption = {
            from: process.env.EMAIL_USER,
            to: emailto,
            subject: subject,
            text : message
        };

        await transporter.sendMail(mailoption);
        res.status(200).json({
            success:true,
            message:"Email sent sucessfully"
        });

    }
    catch(error){

    res.status(500).json({
        success:false,
        error : error.message
    })
    }
})

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'profileimages/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({storage});
app.post('/uploadfile',upload.single('file'),(req,res) =>{
     res.send('file uploaded successfully');
});


app.post('/addservice',async(req,res)=>{
    let json = req.body;
    const cate = req.body.category;
    const subcate = req.body.subcategory;
    const id = req.query.id;
    const db = client.db(dbname);
    const collection = db.collection("users");
    const collection2 = db.collection("services");
    const js1 = await  collection.findOne({_id: new ObjectId(id)},{projection:{_id:1,username:1,}})
    json = {"provider_id":js1._id,
        "provider_name":js1.username,
        ...json,"approval_status":"pending"
        };
       
    const check = await collection2.findOne({"provider_id":js1._id,category:cate,subcategory:subcate});
    
  

    if(check){
        res.json({success:false});
    }
    else{
        const add = await collection2.insertOne(json);
        res.json({success:true});
    }
})

app.get('/getservice',async(req,res)=>{
    const id = req.query.id;
    const db = client.db(dbname);
    const collection2 = db.collection("services");
    const json =await collection2.findOne({_id:new ObjectId(id)});
  
    res.send(json);
    res.end();
})

app.post('/editservice',async(req,res)=>{
    const id = req.query.id;
    const json = req.body;
   
    const db = client.db(dbname);
    const collection = db.collection("services");
    const result = await collection.updateOne({_id:new ObjectId(id)},{$set:json});
    
    res.json({success:true});
    res.end();

})

app.get('/removeservice',async(req,res)=>{
    const id = req.query.sid;
    const db = client.db(dbname);
    const collection = db.collection("services");

    const remove = await collection.deleteOne({_id:new ObjectId(id)});
    res.json({success:true});
    res.end();

})

app.get('/reqservice',async(req,res)=>{
    const db = client.db(dbname);
    const collection2 = db.collection("services");
    const json =await collection2.find({approval_status:"pending"}).toArray();

    res.send(json);
    res.end();
})

app.get('/approve',async(req,res)=>{
    const id = req.query.id;
    const stat = req.query.stat;
    const pid = req.query.pid;
    console.log(pid);
    const db = client.db(dbname);
    const collection2 = db.collection("services");
    const collection = db.collection("users");
    let approve={};
    if(stat == 1){
      approve = await collection2.updateOne({_id:new ObjectId(id)},{$set:{approval_status:"accepted"}});
      const up = await collection.updateOne({_id:new ObjectId(pid)},{$inc:{Services:1}});
      console.log(up);

    }
    else{
      approve = await collection2.updateOne({_id:new ObjectId(id)},{$set:{approval_status:"Rejected"}});
    }
    if(approve){
    res.json({success:true});
    }
    else{
        res.json({success:false});
    }
    res.end();
})

app.get('/listservices',async(req,res)=>{
    const db = client.db(dbname);
    const collection = db.collection("services");
    const list = await collection.find({approval_status:"accepted"}).toArray();
    res.send(list);
    res.end();
})

app.get('/listservices2',async(req,res)=>{
    const id = req.query.id;

    const db = client.db(dbname);
    const collection = db.collection("services");
    const list = await collection.find({provider_id:new ObjectId(id)}).toArray();
    const count = await collection.countDocuments({provider_id: new ObjectId(id), approval_status: "accepted" });
    const count2 = await collection.countDocuments({provider_id: new ObjectId(id), status : "active" });
     
    
    res.send({data : list,accpeted:count,active:count2});
    res.end();
})

app.post('/payment',async(req,res)=>{
    const {firstname,title,provider_name,email,phone,amount} = req.body;
    const productinfo = `${title} by ${provider_name}`;
    const txnid = "txn_" + Math.floor(Math.random() * 1000000);
    const hashstring = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${SALT}`;
    const hash = crypto.createHash("sha512").update(hashstring).digest("hex");
    const params={
        key:MERCHANT_KEY,txnid,amount,productinfo,firstname,email,phone,
        surl:"http://localhost:3000/success",
        furl:"http://localhost:3000/failure",
        hash
    };
    res.json({payu_url:"https://test.payu.in/_payment",params});
    res.end();
})


app.post('/search',async(req,res)=>{
    const {search , city , minprice , maxprice,limit} = req.body;
    let filter = {
        status : "active",approval_status:"accepted"
    };

    if(search){
        filter.$or = [
            {title:{ $regex : search , $options : 'i'}},
            {provider_name:{ $regex : search , $options : 'i'}},
            {category:{ $regex : search , $options : 'i'}},
        ];
    }

    if(city){
          filter.city = { $regex: `^${city}$`, $options: 'i' };
    }

    if(minprice || maxprice){
        filter.price = {};
        if(minprice) filter.price.$gte = parseInt(minprice); 
        if(maxprice) filter.price.$lte = parseInt(maxprice); 
    }

    const db = client.db(dbname);
    const collection = db.collection("services");

    try{
       let query = collection.find(filter); 
       
      

        if (limit) {
            query = query.limit(parseInt(limit)); 
        }
        const result = await query.toArray();
        
        const total = result.length;
        
        res.json({success:true,data:result,total:total});
    }
    catch(err){
        res.json({success:false,message:"error searching"})
    }
})


app.get('/getservice',async(req,res)=>{
    const id = req.query.id;
    
    const db = client.db(dbname);
    const collection = db.collection("services");

    const json = await collection.find({_id:new ObjectId(id)}).toArray();
   
    if(json){
        res.send(json);
    }
    else{
        res.json({success:false,message:"error"});
    }
    res.end();
})

app.post('/booking',async(req,res)=>{
    const json = req.body;
    
    const db = client.db(dbname);
    const collection = db.collection("booking");
    

    const result = await collection.insertOne(json);
    if(result){
        res.json({success:true});
        
    }
    else{
        res.json({success:false});
    }

})

app.get('/bookinglist',async(req,res)=>{
    const id = req.query.pid;
    
    const db = client.db(dbname);
    const collection = db.collection("booking");

    const list = await collection.find({provider_id:id, approval_status:"Pending"}).toArray();
    if(list){
        res.send(list);
      
    }
    else{
        res.json({success:false});
    }
    res.end();

})

app.get('/approvebooking',async(req,res)=>{
    const id = req.query.bid;
    const stat = req.query.stat;
    const pid = req.query.pid;
    
    const db = client.db(dbname);
    const collection = db.collection("booking");
    const collection2 = db.collection("users");
    let approve={};
    if(stat == 1){
      approve = await collection.updateOne({_id:new ObjectId(id)},{$set:{approval_status:"accepted"}});
      const up = await collection2.updateOne({_id:new ObjectId(pid)},{$inc:{Pending_request:1}});
    
    }
    else{
      approve = await collection.updateOne({_id:new ObjectId(id)},{$set:{approval_status:"Rejected"}});
    }
    if(approve){
    res.json({success:true});
    }
    else{
        res.json({success:false});
    }
    res.end();
});

app.get('/worklist',async(req,res)=>{
    const id = req.query.pid;
    const db = client.db(dbname);
    const collection = db.collection("booking");

    const list = await collection.find({provider_id:id,approval_status:"accepted"}).toArray();
  
    if(list){
        res.send(list);
    }
    else{
        res.json({success:false});
    }
    res.end();
    

});
app.get('/listbooking',async(req,res)=>{
    const db = client.db(dbname);
    const collection = db.collection("booking");
    const list = await collection.find({}).toArray();
    res.send(list);
    res.end();
})

app.get('/mybooking',async(req,res)=>{
    const id = req.query.cid;
    const db = client.db(dbname);
    const collection = db.collection("booking");

 const list = await collection.find({
  consumer_id: id,
  $or: [
    {
      payment_method: "online",
      payment_status: "Done",
      approval_status: "accepted"
    },
    {
      payment_method: "cash",
      approval_status: { $in: ["accepted", "accepeted"] }
    }
  ]
}).toArray();
console.log(list);
  
    if(list){
        res.send(list);
    }
    else{
        res.json({success:false});
    }
    res.end();
});
app.get('/handlebooking',async(req,res)=>{
    const id = req.query.cid;
    const db = client.db(dbname);
    const collection = db.collection("booking");
const list = await collection.find({consumer_id: id,$or:[
                                    { payment_method: "online", payment_status: "pending",status:"pending"},
                                    { payment_method: "cash", approval_status: { $in: ["Rejected", "pending"] }
                                    }]}).toArray();
                                
    if(list){
        res.send(list);
    }
    else{
        res.json({success:false});
    }
    res.end();
    

});
app.get('/deletebooking',async(req,res)=>{
    const id = req.query.bid;
    const db = client.db(dbname);
    const collection = db.collection("booking");
    const result = await collection.deleteOne({_id:new ObjectId(id)});



});

app.get('/getbooking',async(req,res)=>{
    const id = req.query.bid;
    const db = client.db(dbname);
    const collection = db.collection("booking");

    const result = await collection.findOne({_id:new ObjectId(id)});
   
    res.send(result);

})

app.get('/donepayment',async(req,res)=>{
    try{
    const id = req.query.bid;
    const db = client.db(dbname);
    const collection = db.collection("booking");

    const result = await collection.updateOne({_id:new ObjectId(id)},{$set:{payment_status:"Done"}});
     res.json({
            success: true,
            message: "Payment updated",
            result
        });

    } catch (err) {
        console.log(err);

        res.json({
            success: false,
            message: "Error updating payment"
        });
    }

}   
);

app.post('/review',async(req,res)=>{
    const json = req.body;
    console.log(json);
    const db = client.db(dbname);
    const collection = db.collection("reviews");

    const check = await collection.findOne({user_id:json.user_id});
    console.log(check);


    if(check){
        res.json({success:false});
    }
    else{
        const add = await collection.insertOne(json);
        res.json({success:true});
    }
    res.end();
})

app.post('/Sreview',async(req,res)=>{
    const json = req.body;
    console.log(json);
    const db = client.db(dbname);
    const collection = db.collection("provider_review");
    const collection2 = db.collection("booking");
    const collection3 = db.collection("users");

    const add = await collection.insertOne(json);
    const up = await collection2.updateOne({_id:new ObjectId(json.booking_id)},{$set:{review:"done"}});

    const providername = json.provider;
    const result = await collection.aggregate([{$match: { provider: providername}},
        { $group: {_id: "$provider",avgRating:{$avg:"$rate"}}}]).toArray();
    const avgRating = result[0]?.avgRating || 0;    
    const u = await collection3.updateOne({username:providername},{$set:{avgRating:avgRating}});
    console.log(avgRating);
    res.json({success:true});
    res.end();
})

app.get("/cbooking",async(req,res)=>{
    const id = req.query.bid;
   
    const pid=req.query.pid;
    
    const db = client.db(dbname);
    const collection = db.collection("booking");
    const collection2 = db.collection("users");
   
    const complete = await collection.updateOne({_id:new ObjectId(id)},{$set:{status:"completed",payment_status:"Done"}});
    const up = await collection2.updateOne({_id:new ObjectId(pid)},{$inc:{Pending_request:-1,Complete_job:1}});
   
    res.end();
})




app.get('/servicedetails',async(req,res)=>{
    const id = req.query.sid;

    const db = client.db(dbname);
    const collection = db.collection("services");
    const collection2 = db.collection("users");
    const collection3 = db.collection("provider_review");

    const data = await collection.findOne({_id:new ObjectId(id)});
    const udata = await collection2.findOne({_id:new ObjectId(data.provider_id)});
    const rdata = await collection3.find({Service_title:data.title}).limit(3).toArray();
   
    res.json({data:data,userdata:udata,rdata:rdata});
    res.end();
})


app.get('/aduserlist',async(req,res)=>{
    
    const db = client.db(dbname);
    const collection = db.collection("users");
    const scollection = db.collection("services");
    const bcollection = db.collection("booking");
    const userlist = await collection.find().limit(5).toArray();
    const bookinglist = await bcollection.find().limit(5).toArray();
    const ucount = await collection.countDocuments();
    const pcount = await collection.countDocuments({usertype:"Provider"});
    const ccount = await collection.countDocuments({usertype:"consumer"});
    const scount = await scollection.countDocuments();
    const bcount = await bcollection.countDocuments();
    const json =  {user:ucount,provider:pcount,services:scount,booking:bcount,consumer:ccount};
    
    res.json({userlist:userlist,info:json,booking:bookinglist});
    res.end();

})

app.post('/contactus',async(req,res)=>{
    const json = req.body;
    const db = client.db(dbname);
    const collection = db.collection("contactus");
    const result = await collection.insertOne(json);
    res.json({success:true});
    res.end();

})
app.listen(port,()=>{
    console.log("server is running on http://localhost:"+port);
})