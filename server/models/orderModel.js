const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendors',
        required:true,},
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','completed','cancelled'],
        default:'pending',
    },
    createdAt:{
        type:Date,
        default:Date.now  },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Orders',orderSchema);