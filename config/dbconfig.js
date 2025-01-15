require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // For Azure SQL
        trustServerCertificate: true, // For self-signed certificates
    },
    port: parseInt(process.env.DB_PORT, 10),
};

const connectToDatabase = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to MS SQL Server');
    } catch (err) {
        console.error('Database connection failed', err);
    }
};

module.exports = {
    sql,
    connectToDatabase,
};
