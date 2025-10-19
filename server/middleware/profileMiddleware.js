const users=require('../models/userModel');
const vendors=require('../models/vendorModel');

const profileMiddleware=async (req,res,next)=>{
    const role=req.user.role;
    if(role==='user'){
        try{
            const user=await users.findById(req.user.id);
            if(!user) return res.status(403).json({message:'unauthorized access'});
            const phone=user.phone;
            const address=user.address;
            if(!phone || !address) return res.status(400).json({message:'complete your profile'});
            next();

        }
        catch(err){
              return res.status(500).json({message:"something went wrong"});
        }
    }
    else if(role==='supplier'){
        try{
            const vendor=await vendors.findById(req.user.id);
            if(!vendor) return res.status(403).json({message:'unauthorized access'});
            const phone=vendor.phone;
            const address=vendor.address;
            if(!phone || !address) return res.status(400).json({message:'complete your profile'});
            next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }

}
}
module.exports=profileMiddleware;