const express = require('express');
const route = express.Router();
const database = require('../db');

//all product by category
route.get('/:name', function(req, res) {


    var sql = "SELECT * FROM products WHERE category = '" + req.params.name + "'";
    database.query(sql, function(err, result) {

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

//category
route.get('/', function(req, res) {

    var sql = "SELECT cat_name FROM categories ORDER BY priority";
    database.query(sql, function(err, result) {
        if (result.length > 0) {

            var array = [];

            for(i=0;i<result.length;i++){
                array.push(result[i].cat_name);
            }
            res.status(200).json({
                status: "ok",
                message: "",
                data: array
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