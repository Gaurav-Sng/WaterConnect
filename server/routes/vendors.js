const router=require('express').Router();
const vendors=require('../models/vendorModel');
const orders=require('../models/orderModel');
const authHandler = require('../middleware/authMiddleware');
// GET all orders for this vendor
router.get('/orders', async (req, res) => {
  try {
    const vendor = await vendors.findById(req.user._id).populate('orders');
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    res.status(200).json({
      message: 'Vendor orders fetched successfully',
      orders: vendor.orders
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update order delivery status
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const order = await orders.findByIdAndUpdate(
      req.params.orderId,
      { status: 'delivered' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Vendor dashboard
router.get('/dashboard',authHandler, async (req, res) => {
  try {
    console.log("hello u are in dashboard")
    const vendor = await vendors.findById(req.user._id).populate('orders');
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
   console.log(vendor);
    const totalOrders = vendor.orders.length?vendor.orders.length:0;
    const revenue = vendor.orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const avgRating =
      vendor.ratings.length > 0
        ? vendor.ratings.reduce((sum, r) => sum + r, 0) / vendor.ratings.length
        : 0;

    const metrics = {
      name: vendor.name,
      email: vendor.email,
      contact: vendor.phone,
      totalOrders,
      revenue,
      avgRating
    };

    res.status(200).json({ message: 'Vendor dashboard data', metrics });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// vendorRoutes.js
router.patch('/profile', async (req, res) => {
  try {
    const { address, contactNumber, businessName } = req.body;
    const vendor = await vendors.findById(req.vendor._id);

    if (address) vendor.address = address;
    if (contactNumber) vendor.contact = contactNumber;
    if (businessName) vendor.businessName = businessName;

    await vendor.save();
    res.status(200).json({ message: 'Profile updated successfully', vendor });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vendor profile', error });
  }
});

module.exports=router;
