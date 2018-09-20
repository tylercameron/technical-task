const mysql = require('mysql');
const keys = require('../keys/keys');

const dbConnection = mysql.createConnection({
    host: keys.databaseHost,
    user: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.database
});

module.exports = dbConnection;