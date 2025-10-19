const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    },
    razorpayPaymentId: {
        type: String,
        required: true,
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'fail'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}

);

module.exports=mongoose.model('Payments', paymentSchema);