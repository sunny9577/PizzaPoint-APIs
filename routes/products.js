const express = require('express');
const route = express.Router();
const database = require('../db');

//product
route.get('/:pid', function(req, res, next) {

    var sql = "SELECT *  FROM products WHERE product_id = " + req.params.pid + "";
    database.query(sql, function(err, result) {

        if (result == null || err)
            res.status(200).json({
                status: "failed",
                message: "Error occured",
                data: null
            });

        if (result.length > 0) {
            res.status(200).json({
                status: "ok",
                message: "",
                data: result
            });
        } else {
            res.status(200).json({
                status: "failed",
                message: "No product found",
                data: null
            });
        }
    });
});

//products
route.get('/', function(req, res, next) {

    var sql = "SELECT *  FROM products WHERE available = 0";
    database.query(sql, function(err, result) {

        if (result == null || err)
            res.status(200).json({
                status: "failed",
                message: "Error occured",
                data: null
            });

        if (result.length > 0) {
            res.status(200).json({
                status: "ok",
                message: "",
                data: result
            });
        } else {
            res.status(200).json({
                status: "failed",
                message: "No product found",
                data: null
            });
        }
    });
});

module.exports = route;