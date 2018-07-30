var mysql = require('mysql');
var config = require('./config.js');

//create connection
var db_config = {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    multipleStatements: true
};

//connect to db
var database;
var looper;

function handleDisconnect() {
    database = mysql.createConnection(db_config);
      database.connect(function(err) {
        if(err){
          console.log('LOG: error when connecting to db:', err.code);
          setTimeout(handleDisconnect, 2000);
        }
        else{
            console.log("LOG: Connected to database");
            looper =  setInterval(function () {
            database.query('SELECT 1');
            }, 5000);
        }
      });
      database.on('error', function(err) {
        clearInterval(looper);
        console.log('LOG: db error', err);

        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
          handleDisconnect();                         
        }else {                                      
          throw err;
        }
        });
}

handleDisconnect();

module.exports = database;