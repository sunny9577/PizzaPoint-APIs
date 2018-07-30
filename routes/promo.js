var express = require('express');
var route = express.Router();
var database = require('../db.js');

route.get('/all',(req, res) => {
    sql = 'SELECT * FROM promo_codes';
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/deactivate/:id',(req, res) => {
    sql = "UPDATE promo_codes SET status = 'deactivated' WHERE promo_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/activate/:id',(req, res) => {
    sql = "UPDATE promo_codes SET status = 'active' WHERE promo_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.post('/create/',(req, res) => {
    if(req.body.type=='value'){
        sql = "INSERT INTO promo_codes VALUES(null,'"+req.body.code+"','active','0','"+req.body.value+"','INR');";
    }else{
        sql = "INSERT INTO promo_codes VALUES(null,'"+req.body.code+"','active','"+req.body.value+"','0','INR');";
    }
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

module.exports = route;