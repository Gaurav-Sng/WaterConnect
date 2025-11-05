const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');      
const vendors = require('../models/vendorModel'); 


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Cookie options: for cross-site cookies (client hosted on different origin)
const cookieOptions = process.env.NODE_ENV === 'production'
  ? { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3600000 }
  : { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 3600000 };

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate inputs
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    if (!['user', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either "user" or "supplier"' });
    }

    // Check if email already exists
    const existingUser = await users.findOne({ email });
    const existingVendor = await vendors.findOne({ email });

    if (existingUser || existingVendor) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newAccount;
    if (role === 'user') {
      newAccount = await users.create({ email, password: hashedPassword });
    } else {
      newAccount = await vendors.create({ email, password: hashedPassword });
    }

    const token = generateToken(newAccount._id, role);

  res.cookie('token', token, cookieOptions);
  return res.status(201).json({ message: `${role} created successfully`, token, userId: newAccount._id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check both collections
    const user = await users.findOne({ email });
    const vendor = await vendors.findOne({ email });

    if (!user && !vendor) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const account = user || vendor;
    const role = user ? 'user' : 'supplier';

    // Compare password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(account._id, role);

  // Send token
  res.cookie('token', token, cookieOptions);
  return res.status(200).json({ message: 'Login successful', token, userId: account._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout',(req,res)=>{
  res.clearCookie('token',{httpOnly:true,sameSite:'strict'});
  return res.status(200).json({message:'logged out successfully'});
})
module.exports = router;
