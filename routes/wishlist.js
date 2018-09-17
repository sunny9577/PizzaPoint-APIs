const express = require('express');
const route = express.Router();
const database = require('../db');
const authenticator = require('../authenticator');


//remove from wishlist
route.delete('/:pid/', authenticator, function(req, res, next) {

    sql = "DELETE from wishlist WHERE cust_id = " + res.locals.cust_id + " AND product_id = " + req.params.pid;

    database.query(sql, function(err, result) {

        if (err) {
            res.status(200).json({
                status: "failed",
                message: "Error occured",
                data: null
            });
        } else {
            res.status(200).json({
                status: "ok",
                message: "",
                data: null
            });
        }
    });
});

//add to wishlist
route.put('/:pid/', authenticator, function(req, res, next) {

    var sql = "SELECT * FROM wishlist WHERE cust_id = "+ res.locals.cust_id + " AND product_id = " + req.params.pid ;
    database.query(sql,function(err,result){
        if (err){
                res.status(200).json({
                    status: "failed",
                    message: "Error occured",
                    data: null
                });
            }
            else {

            if(result.length>0){
                sql = "UPDATE wishlist SET quantity = quantity + 1 WHERE cust_id = "+ res.locals.cust_id + " AND product_id = " + req.params.pid;
            }
            else{
                sql = "INSERT INTO wishlist Value(null," + res.locals.cust_id + "," + req.params.pid + ");";
            }

            database.query(sql, [2, 1], function(err, result) {

                if (err) {
                    console.log(err);
                    res.status(200).json({
                        status: "failed",
                        message: "Error occured",
                        data: null
                    });
                } else {
                    res.status(200).json({
                        status: "ok",
                        message: "",
                        data: null
                    });
                }
            });
        }
    });
    
    
});


//wishlist items
route.get('/', authenticator, function(req, res, next) {


    sql = "Select products.product_id,products.product_title,products.product_des,products.price,products.product_image,products.category,products.resturant_location from products join wishlist ON products.product_id=wishlist.product_id WHERE cust_id = " + res.locals.cust_id+ " ORDER BY wishlist_id DESC";
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
                message: "No item found",
                data: null
            });
        }
    });
});

module.exports = route;