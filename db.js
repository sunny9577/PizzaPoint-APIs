const mysql = require('mysql');
const dotenv = require('dotenv').config();

//create connection
var db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  connectionLimit : 50
};

//- Create the connection variable
var connection = mysql.createPool(db_config);

//- Establish a new connection
connection.getConnection(function(err){
    if(err) {
        console.log(err);
        console.log("Cannot establish a connection with the database. Exiting....");
        process.exit(1);
    }else {
        console.log("New connection established with the database. ")
    }
});

module.exports = connection;