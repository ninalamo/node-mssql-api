const { sql } = require('../config/dbconfig');

const getUsers = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
};

const addUser = async (req, res) => {
    const { Name, Email } = req.body;
    console.log(req.body);
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Name', sql.NVarChar, Name)
            .input('Email', sql.NVarChar, Email)
            .query('INSERT INTO Users (Name, Email) VALUES (@Name, @Email); SELECT SCOPE_IDENTITY() AS Id');
        res.json({ id: result.recordset[0].Id, Name, Email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    }
};

module.exports = {
    getUsers,
    addUser,
};
