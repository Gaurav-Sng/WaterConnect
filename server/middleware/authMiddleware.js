const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const vendors = require('../models/vendorModel');
const authHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'no token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, role } = decoded;

        let registered;
        if (role === 'user') registered = await users.findById(id);
        else if (role === 'supplier') registered = await vendors.findById(id);

        if (!registered) return res.status(403).json({ message: 'unauthorized access' });
        req.user = registered; // attach full object for downstream routes
        next();
    } catch (err) {
        return res.status(401).json({ message: 'unauthorized access' });
    }
};

module.exports = authHandler;