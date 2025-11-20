let mysql = require('mysql');

require('dotenv').config();

const hostDb = process.env.DB_HOST
const userDb = process.env.DB_USER
const passDb = process.env.DB_PASSWORD
const databaseDb = process.env.DB_DATABASE

let connection = mysql.createConnection({
    host: hostDb,
    user: userDb,
    password: passDb,
    database: databaseDb
});

connection.connect(function (error) {
    if (error) {
        console.log('err:', error);
    } else {
        console.log('Connection Succuessfully!');
    }
})

module.exports = connection; 