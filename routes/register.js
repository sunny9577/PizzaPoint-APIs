const express = require('express');
const route = express.Router();
const database = require('../db');
const tokengenerator = require("randomstring");
const bcrypt = require('bcrypt');

//register
route.post('/', function(req, res) {

    var cust_fname = req.body.firstname;
    var cust_lname = req.body.lastname;
    var cust_email = req.body.email;
    var cust_pass = req.body.password;
    var cust_joined = (new Date()).toISOString().substring(0, 19).replace('T', ' ');

    var app_token = tokengenerator.generate(96);
    var salt = bcrypt.genSaltSync(7);
    var hash = bcrypt.hashSync(cust_pass, salt);
    cust_pass = hash;
    var sql = "SELECT * FROM users WHERE cust_email = '" + cust_email + "'";
    database.query(sql, function(err, result) {

        if (result.length > 0) {
            res.status(200).json({
                status: "failed",
                message: "Email already registered",
                data: null
            });
        }
        else {

            sql = "INSERT INTO users (cust_fname, cust_lname, cust_email, cust_pass, cust_joined, app_token) VALUES ('" + cust_fname + "', '" + cust_lname + "', '" + cust_email + "', '" + cust_pass + "' ,'" + cust_joined + "', '" + app_token.toUpperCase() + "')";
            
            database.query(sql, function() {
                sql = "SELECT * FROM users WHERE cust_email = '" + cust_email + "'";
                database.query(sql, function(err, result) {
                    if (result.length > 0) {
                        res.status(200).json({
                            status: "ok",
                            message: "Registration successful",
                            data: result
                        });
                    } else {
                        res.status(200).json({
                            status: "failed",
                            message: "Not registered",
                            data: null
                        });
                    }
                });
            });
        }
    });
});

module.exports = route;