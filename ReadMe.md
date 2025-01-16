Here's the markdown for the README file:

```markdown
# Database Setup with Products and Users

This README provides instructions for setting up the database with `Users` and `Products` tables, and running the setup using Docker CLI commands.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Project Structure

project/
│
├── config/
│   ├── dbConfig.js
│
├── controllers/
│   ├── userController.js
│   ├── productController.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│
├── migrations/
│   ├── <timestamp>_create_users_table.js
│   ├── <timestamp>_create_products_table.js
│
├── seeds/
│   ├── seed_users.js
│   ├── seed_products.js
│
├── src/
│   ├── components/
│   │   ├── NavBar.js
│   │   ├── Users.js
│   │   ├── UserForm.js
│   │   ├── Products.js
│   │   ├── ProductForm.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│
├── .env
├── knexfile.js
├── server.js
└── package.json


## Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_DATABASE=your_db_database
DB_PORT=your_db_port
PORT=5000
```

## Database Configuration

The database configuration is defined in `config/dbConfig.js`:

```javascript
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
```

## Migrations

### Create Users Table

**migrations/<timestamp>_create_users_table.js**:

```javascript
exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
        table.increments('Id').primary();
        table.string('Name', 255).notNullable();
        table.string('Email', 255).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Users');
};
```

### Create Products Table

**migrations/<timestamp>_create_products_table.js**:

```javascript
exports.up = function(knex) {
    return knex.schema.createTable('Products', function(table) {
        table.increments('Id').primary();
        table.string('Name', 255).notNullable();
        table.decimal('Price', 18, 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Products');
};
```

## Seeding

### Seed Users Data

**seeds/seed_users.js**:

```javascript
exports.seed = function(knex) {
    return knex('Users').del()
        .then(function () {
            return knex('Users').insert([
                { Name: 'John Doe', Email: 'john@example.com' },
                { Name: 'Jane Smith', Email: 'jane@example.com' },
            ]);
        });
};
```

### Seed Products Data

**seeds/seed_products.js**:

```javascript
exports.seed = function(knex) {
    return knex('Products').del()
        .then(function () {
            return knex('Products').insert([
                { Name: 'Product 1', Price: 10.00 },
                { Name: 'Product 2', Price: 20.00 },
            ]);
        });
};
```

## Running Migrations and Seeds

To run the migrations and seeds, use the following commands:

```bash
# Run migrations
npx knex migrate:latest

# Run seeds
npx knex seed:run
```

## Docker CLI Commands

To run the setup using Docker, you can use the following Docker CLI commands:

### Build Docker Image

```bash
docker build -t my-app .
```

### Run Docker Container

```bash
docker run -d -p 5000:5000 --name my-app-container --env-file .env my-app
```

### Access Docker Container

To access the running Docker container:

```bash
docker exec -it my-app-container /bin/bash
```

## Start the Server

Once everything is set up, start the server:

```bash
npm start
```

Your server should now be running on `http://localhost:5000`.

## Endpoints

- **GET /api/users**: Retrieves the list of users.
- **POST /api/users**: Adds a new user.
- **GET /api/products**: Retrieves the list of products.
- **POST /api/products**: Adds a new product.

## Conclusion

This README provides a comprehensive guide to setting up the database, running migrations and seeds, and using Docker CLI commands to run the setup. If you encounter any issues, feel free to ask for help!

Happy coding! 😊
```

This should cover everything you need for setting up the database, running migrations and seeds, and using Docker CLI commands. Let me know if you need any more details or have other questions! 😊