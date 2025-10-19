const orders=require('../models/orderModel');
const ownershipCheck=async (req,res,next)=>{
    const order_id=req.body.order_id;
    const user=req.user._id;
    try{
        const order=await orders.findById(order_id);
        if(!order)res.status(404).json({message:'order not found'});
       if(order.userId.toString()===user.toString() ||order.vendorId.toString()===user.toString()){
        next();
       }
       else{
        res.status(403).json({message:'you are not authorized to access this resource'});
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }

}

module.exports=ownershipCheck;