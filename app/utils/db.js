var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "mydb",
    multipleStatements: true
});

module.exports = {
    connection: con
}