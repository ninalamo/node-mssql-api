
# Database Setup with Products and Users

This README provides instructions for setting up the database with `Users` and `Products` tables, and running the setup using Docker CLI commands.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Project Structure

```
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
├── server.js
└── package.json
```

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

## Creating Tables

You can use the following SQL scripts to create the `Users` and `Products` tables:

### Create Users Table

```sql
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL
);
```

### Create Products Table

```sql
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL
);
```

## Seeding Data

You can use the following SQL scripts to seed initial data into the `Users` and `Products` tables:

### Seed Users Data

```sql
INSERT INTO Users (Name, Email) VALUES ('John Doe', 'john@example.com');
INSERT INTO Users (Name, Email) VALUES ('Jane Smith', 'jane@example.com');
```

### Seed Products Data

```sql
INSERT INTO Products (Name, Price) VALUES ('Product 1', 10.00);
INSERT INTO Products (Name, Price) VALUES ('Product 2', 20.00);
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

This README provides a comprehensive guide to setting up the database, creating tables, seeding data, and using Docker CLI commands to run the setup. If you encounter any issues, feel free to ask for help!

Happy coding! 😊
```

This README provides instructions for manually creating tables and seeding data without using Knex or migrations. If you have any further questions or need additional modifications, feel free to ask! 😊
