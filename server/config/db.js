const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('Testing MongoDB connection...');  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
    });
    console.log('✅ SUCCESS: Connected to MongoDB!');
    
  } catch (error) {
    console.log('❌ ERROR DETAILS:');
    console.log(' - Error name:', error.name);
    console.log(' - Error message:', error.message);
    console.log(' - Full error:', error);
    process.exit(1);
  }
};

testConnection();