const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database configuration
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

// Test database connection
sql.connect(dbConfig)
    .then(() => console.log('Connected to MS SQL Server'))
    .catch((err) => console.error('Database connection failed', err));

// API Endpoints
app.get('/api/users', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .query('INSERT INTO Users (Name, Email) VALUES (@Name, @Email); SELECT SCOPE_IDENTITY() AS Id');
        res.json({ id: result.recordset[0].Id, name, email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
