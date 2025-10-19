const express=require('express')
const dotenv=require('dotenv')
const app=express();
const cors=require('cors');
dotenv.config();
//routes
const auth=require('./routes/auth');
const user=require('./routes/users');
const vendor=require('./routes/vendors')
//middleware
const authHandler=require('./middleware/authMiddleware');
const payments=require('./routes/payments')
const orders=require('./routes/orders');
const port=process.env.PORT||3000;

require('./config/db');
app.use(express.json());
app.use(cors({
    origin:process.env.ClientURI,
    credentials:true
}));
app.use('/auth',auth);
app.use('/user',authHandler,user);
app.use('/supplier',authHandler,vendor);
app.use('/payment',payments);
app.use('/order',orders);


app.get('/',(req,res)=>{
    res.send('welcome to water connect');
})
app.use((err, req, res, next) => {
    if(err)console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});


app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})