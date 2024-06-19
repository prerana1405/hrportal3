const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    isConnected = true;
    console.log(`MongoDB connected to host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    if (!isConnected) {
      throw new Error('Not connected to MongoDB');
    }
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    isConnected = false;
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

module.exports = {
  connectDB,
  disconnectDB
};
