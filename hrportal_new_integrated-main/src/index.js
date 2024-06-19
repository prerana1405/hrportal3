const app = require('./app.js');
const connectMongoDB = require('./db/mongodb.js');
const db = require('./db/mysql.js');

const startServer = async () => {
    try {
        await connectMongoDB.connectDB();
        console.log('Connected to MongoDB');

        // Connect to MySQL
        await db.connectToDatabase();
        console.log('Connected to MySQL');

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database. Server not started.');
        if (err.message.includes('MongoDB')) {
            console.error('MongoDB connection error:', err.message);
        } 
        if (err.message.includes('MySQL')) {
            console.error('MySQL connection error:', err.message);
        } 
        try {
            await db.closeConnection();
            console.log('Closed MySQL connection');
        } catch (mysqlErr) {
            console.error('Error closing MySQL connection:', mysqlErr.message);
        }

        process.exit(1); 
    }
};

startServer();

     