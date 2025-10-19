const crypto=require('crypto');
const  HMAC_SHA256=(data,secret)=>{
    return crypto.createHmac('sha256',secret).update(data).digest('hex');

}
const verifyPayment=(req,res,next)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const temp=HMAC_SHA256(razorpay_order_id+"|"+razorpay_payment_id,process.env.RAZORPAY_SECRET_KEY);
    if(temp===razorpay_signature){
        next();
    }
    else{
        res.status(400).json({message:'payment verification failed'});
    }

}

module.exports=verifyPayment;