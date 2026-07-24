const mongoose = require('mongoose');

/**
 * Connects to MongoDB database using Mongoose.
 * Read connection string from MONGO_URI env variable.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hackverse';
    
    // Connect configuration
    const connectionInstance = await mongoose.connect(mongoUri);

    console.log(`\nMongoDB Connected! Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB database: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
