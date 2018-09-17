const express = require('express');
const route = express.Router();
const database = require('../../db');

route.get('/all',(req, res) => {
    sql = 'SELECT * FROM `ALL_PRODUCTS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get('/new',(req, res) => {
    sql = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'products' AND table_schema = DATABASE( );SELECT cat_name FROM categories ORDER BY priority ";
    database.query(sql,[2,1],function(err,result){
        if(err){
            console.log(err);
            result = "error";
            res.status(200).json(result);
        }else{
            res.status(200).json({
                id:result[0][0].AUTO_INCREMENT,
                category:result[1]
            });
        }
        
    });
});

route.post('/create',(req, res) => {
    sql = "INSERT INTO products (product_title, product_des, product_image, category, veg, resturant_location, contact, price, currency, home_delivery, pickup) VALUES ('"+req.body.title+"', '"+req.body.desc+"', '"+req.body.uri+"', '"+req.body.category+"' ,'"+req.body.veg+"', '"+req.body.location+"', '"+req.body.contact+"', '"+req.body.price+"', '"+req.body.currency+"', '"+req.body.home_del+"', '"+req.body.pickup+"');";
    database.query(sql,function(err,result){
        if(err){
        console.log(err);
        result = "error";
        }
        res.status(200).json(result);
    });
});

module.exports = route;