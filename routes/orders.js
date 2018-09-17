const express = require('express');
const route = express.Router();
const database = require('../db');
const authenticator = require('../authenticator');

//my orders
route.get('/',authenticator, function(req, res) {

    sql = "SELECT products.product_id,products.product_title,products.product_des,products.product_image,products.category,products.resturant_location,orders.order_id,orders.order_date,orders.status FROM products JOIN orders ON products.product_id=orders.ordered_product WHERE cust_id = " + res.locals.cust_id + " ORDER BY order_date DESC";
        database.query(sql, function(err, result) {

            if(err){
                console.log(err);
                res.status(200).json({
                    status: "failed",
                    message: "Error occured",
                    data: null
                });
            }
            else{
            res.status(200).json({
                status: "ok",
                message: "",
                data: result
            });
        }

    });

});

//particular order details
route.get('/details/:orderid/',authenticator,function(req,res){

    sql = "SELECT t1.product_id,t1.product_title,t1.product_image,t1.resturant_location,t1.contact,t1.price, t2.order_date,t2.payment_method,t2.status, t3.cust_name,t3.address_line_1,t3.address_line_2, t4.state_name, t5.city_name, t3.contact_number FROM products as t1 LEFT JOIN orders as t2 ON t1.product_id = t2.ordered_product LEFT JOIN address as t3 ON t2.shipped_to = t3.address_id LEFT JOIN states as t4 ON t3.state = t4.state_id LEFT JOIN cities as t5 ON t3.city = t5.city_id WHERE t2.order_id = "+req.params.orderid+" AND t2.cust_id = "+res.locals.cust_id;
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            res.status(200).json({
                status: "failed",
                message: "Error occured",
                data: null
            });
        }
        else{
        res.status(200).json({
            status: "ok",
            message: "",
            data: result
        });
        }
    });
});

//place order
route.post('/place/',authenticator,function(req,res){

    var cust_name = req.body.cust_name;
    var address_line_1 = req.body.address_line_1;
    var address_line_2 = req.body.address_line_2;
    var city = req.body.city;
    var state = req.body.state;
    var contact_number = req.body.contact_number;
    var price = req.body.price;
    var promo = req.body.promo;
    var gv = req.body.gv;
    var fprice = req.body.fprice;
    var items = req.body.items.trim();
    
    itemsArr = items.split(" ");
    var add_address = "INSERT INTO address VALUES (null,'"+res.locals.cust_id+"','"+cust_name+"','"+address_line_1+"','"+address_line_2+"',(SELECT city_id from cities where city_name = '"+city+"'),(SELECT state_id from states where state_name = '"+state+"'),'"+contact_number+"')";
    
    database.query(add_address,function(err,result){
        console.log(err);
        var add_id = result.insertId;
        
        var place_order="";
        for(i=0;i<itemsArr.length;i++){
            place_order+="INSERT INTO orders VALUES (null,'"+res.locals.cust_id+"','"+itemsArr[i]+"','"+new Date().toISOString().split('T')[0]+"','COD','pending','"+add_id+"','"+price+"','"+fprice+"','"+promo+"','"+gv+"');";
        }
        database.query(place_order,[2,1],function(err,result){
            
            sql = "DELETE from cart WHERE cust_id = " + res.locals.cust_id ;
            if (err) {
                console.log(err);
                res.status(200).json({
                    status: "failed",
                    message: "Error occured",
                    data: null
                });
            }else{
            database.query(sql, function(err, result) {
                
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
                        message: "Order Placed",
                        data: null
                    });
                }
            });
        }
        })
    });
});

//cancel
route.delete('/:orderid/',authenticator, function(req, res) {

            var sql = "UPDATE orders SET status = 'canceled' WHERE order_id = '" + req.params.orderid + "' AND cust_id = '" + res.locals.cust_id + "' ";
    database.query(sql, function() {

        res.status(200).json({
            status: "ok",
            message: "",
            data: null
        });

    });

});

module.exports = route;