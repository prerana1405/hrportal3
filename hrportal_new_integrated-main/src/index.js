
import app from './app.js';
import connectDB from './db/mongodb.js';
import db from './db/mysql.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
        return db.connectToDatabase();
    })
    .then(() => {
        console.log('Connected to MySQL');
        app.listen(process.env.PORT,() => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database. Server not started.', err);
    });




