const express  = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const database = require('../db');
const app = express();
const jwtauth = require('./jwtauth');
const jwt = require('jsonwebtoken');

var ordersRoute = require('./routes/orders.js');
var productsRoute = require('./routes/products.js');
var promoRoute = require('./routes/promo.js');
var voucherRoute = require('./routes/voucher.js');
var bannerRoute = require('./routes/banner.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/orders/',ordersRoute);
app.use('/products/',productsRoute);
app.use('/promo/',promoRoute);
app.use('/voucher/',voucherRoute);
app.use('/banner/',bannerRoute);

app.route("/invoice/:id",jwtauth,function(req,res){

    sql = "SELECT * FROM `INVOICE_VIEW` WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        if(err){
            result[0] = 'error';
        }
        res.send(result[0]);
    });
});

app.get("/dashboard",jwtauth,function(req,res){

    sql = "SELECT count(*) as pending FROM orders WHERE status = 'pending';SELECT count(*) as shipped FROM orders WHERE status = 'shipped';SELECT count(*) as delivered FROM orders WHERE status = 'delivered';SELECT count(*) as canceled FROM orders WHERE status = 'canceled';";
    database.query(sql,[2,1],(err,result)=>{
        if(err){
            res.status(200).send("error");
        }
        else{
            res.send({pending:result[0][0].pending,
            shipped:result[1][0].shipped,
            delivered:result[2][0].delivered,
            canceled:result[3][0].canceled});
        }
    });
});

app.post('/changepassword',jwtauth,(req, res) => {

    oldpass = req.body.oldpassword;
    newpass = req.body.newpassword;

    sql = "UPDATE admins SET password = '"+newpass+"' WHERE password = '"+oldpass+"'";

    database.query(sql,function(err,result){
            if(err){
                res.status(200).send("error");
            }
            else{
                if(result.affectedRows==1){
                    res.status(200).send("Password Changed");
                }
                else{
                    res.status(200).send("Password Change Failed");
                }
            }
    });
});

app.post('/login',function(req,res){
    user = req.body.username;
    pass = req.body.password;
    sql = "SELECT * from admins where email = '"+user+"' AND password = '"+pass+"'";
    database.query(sql,(err,result)=>{
        console.log(err);
        if(err){
            res.send("error");
        }else{
            jwt.sign({user:user},"secretxD",{expiresIn: '12h'},function(err,token){
                if(err)
                    res.send(403);
                else {
                    sql = "UPDATE admins SET token='"+token+"' WHERE uid= "+result[0].uid;
                    database.query(sql,(err,result)=>{
                        if(err){
                            res.send("error");
                        }else{
                            if(result)
                                res.send({token:token});
                            else
                                res.send("error");
                        }
                    })
                }
            });
        }
    })

})

app.post('/verify',jwtauth,(req,res)=>{
    res.send({token:req.token});
});

module.exports = app;