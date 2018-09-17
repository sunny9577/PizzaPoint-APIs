const express = require('express');
const route = express.Router();
const database = require('../db');
const tokengenerator = require("randomstring");
const bcrypt = require('bcrypt');

//login
route.post('/', function(req, res) {

    var cust_email = req.body.email;
    var cust_pass = req.body.password;

    sql = "SELECT * FROM users WHERE cust_email = '" + cust_email+"'";
    
    database.query(sql, function(err, result) {

        var passValid = false;
        
        if (result.length === 1 ){
            if(bcrypt.compareSync(cust_pass,result[0].cust_pass)){
                passValid = true;
            }
        }
        else{
            res.status(200).json({
                status: "failed",
                message: "Email id not registered",
                data: null
            });
            return;
        }
        
        var app_token;
        var uid;
        var update;
        if (passValid) {
            app_token = tokengenerator.generate(96);
            uid = result[0].cust_id;
            update = "UPDATE users SET app_token = '" + app_token.toUpperCase() + "' WHERE cust_id=" + uid;
            database.query(update, function() {
                database.query(sql, function(err, result) {
                    if (result) {
                        var user = {
                            "cust_fname": result[0].cust_fname,
                            "cust_lname": result[0].cust_lname,
                            "cust_email": result[0].cust_email,
                            "app_token": result[0].app_token
                        }
                        var array = [user];
                        res.status(200).json({
                            status: "ok",
                            message: "Login Successful",
                            data: array
                        });
                    } else {
                        res.status(200).json({
                            status: "failed",
                            message: "Login Failed",
                            data: null
                        });
                    }
                });
            });
        }
        else {
            res.status(200).json({
                status: "failed",
                message: "Password Incorrect",
                data: null
            });
        }
    });
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

module.exports = route;