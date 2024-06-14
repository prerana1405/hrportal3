import mongoose from "mongoose";


const connectDB = async () => {
      try {
         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
         console.log(`\n MongoDB connected  DB host ${connectionInstance.connection.host}`)
      } catch (error) {
        console.log("MongoDb connection error",error);
        process.exit(1);
        
      }
}

export const disconnectDB = async () => {
  try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
  } catch (error) {
      console.error('MongoDB disconnection error:', error);
      throw error;
  }
};

export default  connectDB 