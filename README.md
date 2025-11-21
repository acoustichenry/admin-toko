# Product Management System

A web application for managing products and purchasing operations.

## Features

- View list of products with details (name, price, category, stock, description)
- View list of purchasing transactions with details (id, product name, category, date, quantity, price, status)
- Create new purchasing transactions
- Update product stock levels   
- Cancel purchasing transactions

## Technologies Used

- Node.js
- Express
- EJS
- Bootstrap
- MySQL
- Dotenv
- Body-parser
- Cors

## Installation
1. Clone the repository using `git clone https://github.com/acoustichenry/admin-toko.git`
2. Install dependencies using `npm install`
3. Import the database from the `admin-toko.sql` file to your MySQL database using your MySQL client
4. Create a `.env` file in the root directory and add the following variables:
    - DB_HOST=your_database_host
    - DB_USER=your_database_user
    - DB_PASSWORD=your_database_password
    - DB_DATABASE=your_database_name
5. Start the server using `npm start`
6. Open the browser and navigate to http://localhost:2727

## API Endpoints
1. `GET /api/v1/products/get-product` - Get list of products
2. `POST /api/v1/products/create-product` - Create a new product
3. `GET /api/v1/purchasing/get-purchasing` - Get list of purchasing transactions
4. `POST /api/v1/purchasing/create-purchasing` - Create a new purchasing transaction
5. `PUT /api/v1/purchasing/update-purchasing` - Update a purchasing transaction
6. `DELETE /api/v1/purchasing/delete-purchasing` - Delete a purchasing transaction

## Usage
1. Navigate to the home page to view the list of products and purchasing transactions
2. Navigate to the purchasing page to create a new purchasing transaction
3. Navigate to the products page to view the list of products
4. Navigate to the purchasing page to view the list of purchasing transactions
5. Navigate to the products page to view the list of products
6. Navigate to the purchasing page to view the list of purchasing transactions
7. Navigate to the products page to view the list of products
8. Navigate to the purchasing page to view the list of purchasing transactions
9. Navigate to the products page to view the list of products
10. Navigate to the purchasing page to view the list of purchasing transactions