const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let connection;

const connectToDatabase = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.NAME,
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci'
        });
        console.log('Connected to MySQL');
    } catch (error) {
        handleConnectionError(error);
        throw error; // Rethrow the error to be caught by the caller
    }

    // Setup error handling for the connection
    connection.on('error', (err) => {
        handleConnectionError(err);
    });

    return connection;
};

const handleConnectionError = (err) => {
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('MySQL connection error: Access denied. Please check your credentials.');
    } else {
        console.error('MySQL connection error:', err.message);
    }
};

const closeConnection = async () => {
    try {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        } else {
            console.warn('Database connection was not established');
        }
    } catch (err) {
        console.error('Error closing the database connection:', err.message);
        throw err; 
    }
};

module.exports = {
    connectToDatabase,
    closeConnection,
    connection
};







































// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// let connection;

// const connectToDatabase = async () => {
//     try {
//         connection = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME
//         });

//         connection.on('error', (err) => {
//             console.error('MySQL connection error:', err);
//             if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                 handleDisconnect(); // Reconnect on connection loss
//             } else {
//                 throw err; // Throw other errors to stop the application
//             }
//         });

//         console.log('Connected to MySQL database');
//     } catch (error) {
//         console.error('Error connecting to database:', error);
//         throw new Error('MySQL connection error: Failed to connect to database'); // Rethrow with a generic message
//     }
// };

// const handleDisconnect = () => {
//     connection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     });

//     connection.connect((err) => {
//         if (err) {
//             console.error('Error reconnecting:', err);
//             setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
//         } else {
//             console.log('Reconnected to MySQL database');
//         }
//     });

//     connection.on('error', (err) => {
//         console.error('MySQL reconnection error:', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect(); // Reconnect on connection loss
//         } else {
//             throw err; // Throw other errors to stop the application
//         }
//     });
// };

// module.exports = {
//     connectToDatabase,
//     connection // Export connection for testing purposes
// };
