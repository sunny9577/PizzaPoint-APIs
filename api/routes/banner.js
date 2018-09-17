const express = require('express');
const route = express.Router();
const database = require('../../db');

route.get('/all',(req, res) => {
    sql = 'SELECT * FROM banners';
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/deactivate/:id',(req, res) => {
    sql = "UPDATE banners SET active = '1' WHERE banner_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/activate/:id',(req, res) => {
    sql = "UPDATE banners SET active = '0' WHERE banner_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.post('/create/',(req, res) => {
    sql = "INSERT INTO banners VALUES(null,'"+req.body.title+"','"+req.body.imgurl+"','"+req.body.desurl+"','0');";
    database.query(sql,function(err,result){
        console.log(err);
        res.status(200).json(result);
    });
});

module.exports = route;