const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const orders = require('../models/orderModel');
const verifyPayment = require('../middleware/verifyPayment');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create', async (req, res) => {
  console.log('Creating Razorpay order');
  try {
    const { orderId } = req.body; // existing order in DB
    const order = await orders.findById(orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const options = {
      amount: order.price * 100, // in paise
      currency: 'INR',
      receipt: order._id.toString()
    };

    const paymentOrder = await razorpay.orders.create(options);

    // attach razorpay_order_id to our order
    order.razorpay_order_id = paymentOrder.id;
    await order.save();

    res.status(201).json({
      message: 'Razorpay order created successfully',
      orderId: paymentOrder.id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency
    });

  } catch (err) {
    res.status(500).json({ message: 'Payment order creation failed', error: err.message });
  }
});

// Verify payment signature
router.post('/verify', verifyPayment, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    // Update order status to paid
    const order = await orders.findOne({ razorpay_order_id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'paid';
    order.razorpay_payment_id = razorpay_payment_id;
    await order.save();

    res.status(200).json({ message: 'Payment verified successfully', order });

  } catch (err) {
    res.status(500).json({ message: 'Payment verification error', error: err.message });
  }
});

module.exports = router;
