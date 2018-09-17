const express = require('express');
const route = express.Router();
const database = require('../../db');
const FCM = require('fcm-push');
const dotenv = require('dotenv').config();

var serverKey = process.env.FCM_KEY;

var fcm = new FCM(serverKey);

route.get('/pending',(req, res) => {

    sql = 'SELECT * FROM `PENDING_ORDERS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get('/canceled',(req, res) => {

    sql = 'SELECT * FROM `CANCELED_ORDERS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get('/shipped',(req, res) => {
    
    sql = 'SELECT * FROM `SHIPPED_ORDERS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get('/delivered',(req, res) => {

    sql = 'SELECT * FROM `DELIVERED_ORDERS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get('/all',(req, res) => {

    sql = 'SELECT * FROM `ALL_ORDERS_VIEW`';
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            result = "error";
        }
        res.status(200).json(result);
    });
});

route.get("/delivered/:id",(req,res)=>{
    var sql = "UPDATE orders SET status = 'delivered' WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        getOrderDetails(req.params.id,function(data){
        var title = "Order Delivered";
        var text = data.name+" has been delivered";
        var to = data.token;
        sendNotification(title,text,to);
        res.status(200).json(result);
        });
    });
});

route.get("/cancel/:id",(req,res)=>{
    var sql = "UPDATE orders SET status = 'canceled' WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        getOrderDetails(req.params.id,function(data){
        var title = "Order Canceled";
        var text = data.name+" has been Canceled";
        var to = data.token;
        sendNotification(title,text,to);
        res.status(200).json(result);
        });
    });
});

route.get("/pending/:id",(req,res)=>{
    var sql = "UPDATE orders SET status = 'pending' WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        getOrderDetails(req.params.id,function(data){
        var title = "Processing Order";
        var text = data.name+" is under processing";
        var to = data.token;
        sendNotification(title,text,to);
        res.status(200).json(result);
        });
        
    });
});

route.get("/shipped/:id",(req,res)=>{
    var sql = "UPDATE orders SET status = 'shipped' WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        getOrderDetails(req.params.id,function(data){
        var title = "Order Shipped";
        var text = data.name+" has been Shipped";
        var to = data.token;
        sendNotification(title,text,to);
        res.status(200).json(result);
        });
    });
});

function sendNotification(mtitle, mtext, mtoken){

    var message = {
        to: mtoken,
        notification: {
            title: mtitle,
            body: mtext
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("FCM failed "+ mtoken);
            console.log(err);
        } else {
            console.log("FCM response", response);
        }
    });
}

function getOrderDetails(id,_callback){
    var sql = "SELECT * FROM `FCM_NOTIFICATION_VIEW` WHERE order_id = "+id;
    database.query(sql,(err,result)=>{
        var product_name = result[0].product_title;
        var fcm_token = result[0].fcm_token;
        _callback({
            name:product_name,
            token:fcm_token
        })
    });
}

module.exports = route;