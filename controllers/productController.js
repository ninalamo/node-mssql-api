const { sql } = require('../config/dbconfig');

const getProducts = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving products');
    }
};

const addProduct = async (req, res) => {
    const { Name, Price } = req.body;
    console.log(req.body);
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Name', sql.NVarChar, Name)
            .input('Price', sql.Decimal(18, 2), Price)
            .query('INSERT INTO Products (Name, Price) VALUES (@Name, @Price); SELECT SCOPE_IDENTITY() AS Id');
        res.json({ id: result.recordset[0].Id, Name, Price });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product');
    }
};

module.exports = {
    getProducts,
    addProduct,
};
