const express = require('express');
const router = express.Router();
const users = require('../models/userModel');

// Get logged-in user's info
router.get('/me', async (req, res) => {
    try {
        const { _id } = req.user;  // assuming req.user is populated by auth middleware
        const user = await users.findById(_id).select('-password');
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user info
router.put('/update', async (req, res) => {
    try {
        const {name, phone, address } = req.body;
        const { _id } = req.user;

        const user = await users.findByIdAndUpdate(
            _id,
            { name, phone, address },
            { new: true } // return updated document
        ).select('-password');

        res.status(200).json({ message: 'Info updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const { _id } = req.user;
        const user=await users.findById(_id).populate('orders');
        if(!user)res.status(404).json({message:'user not found'})
        res.status(200).json({ message: `Fetching orders for ${_id}`,orders:user.orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
