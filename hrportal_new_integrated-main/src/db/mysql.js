import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const closeConnection = () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed');
        }
    });
};

export default {  connectToDatabase, closeConnection };





