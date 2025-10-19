const express = require('express');
const router = express.Router();
const orders = require('../models/orderModel');
const users = require('../models/userModel');
const vendors = require('../models/vendorModel');
const ownershipCheck = require('../middleware/ownerShipCheck');
const authHandler = require('../middleware/authMiddleware');

// Create new order
router.post('/create',authHandler, async (req, res) => {
  try {
    const { vendorId, quantity, price } = req.body;
    const userId = req.user._id;

    if (!vendorId || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const order = await orders.create({ userId, vendorId, quantity, price });

    await Promise.all([
      users.findByIdAndUpdate(userId, { $push: { orders: order._id } }),
      vendors.findByIdAndUpdate(vendorId, { $push: { orders: order._id } })
    ]);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Track order
router.get('/track/:orderId', ownershipCheck, async (req, res) => {
  res.status(200).json({ message: 'Order fetched successfully', order: req.order });
});

// Cancel order (only if status is not delivered)
router.delete('/cancel/:orderId', ownershipCheck, async (req, res) => {
  try {
    const order = req.order;

    if (order.status === 'delivered') {
      return res.status(400).json({ message: 'Delivered orders cannot be canceled' });
    }

    order.status = 'canceled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
