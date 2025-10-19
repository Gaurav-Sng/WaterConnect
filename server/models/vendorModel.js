const mongoose = require('mongoose');
const RatingSchema=new mongoose.Schema({
    ratingValue:{
        type:Number,
        range:[1,5],
        default:2.2,
    },
    comment:String,
    createdAt:Date
})
const vendorSchema = new mongoose.Schema({
    name: String,
    businessName:String,
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    contact: {
        type: Number,
        require: false,
    },
    address: {
        type: String,
        require: false,
    },
    availableStock: {
        type: Number,
        default: 0,
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Orders',
        default:[],
    },
    rating:{
        type:Number,
        default:2.2,
    },
    ratings:[RatingSchema],
    totalratings:Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})
module.exports=mongoose.model('Vendors', vendorSchema);