var express  = require('express');
var bodyParser = require("body-parser");
var randomstring = require("randomstring");
var cors = require('cors');
var database = require('./db.js');
var app = express();

var ordersRoute = require('./routes/orders.js');
var productsRoute = require('./routes/products.js');
var promoRoute = require('./routes/promo.js');
var voucherRoute = require('./routes/voucher.js');
var bannerRoute = require('./routes/banner.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('LOG: Server started!');
});

app.use('/api/orders/',ordersRoute);
app.use('/api/products/',productsRoute);
app.use('/api/promo/',promoRoute);
app.use('/api/voucher/',voucherRoute);
app.use('/api/banner/',bannerRoute);

app.route("/api/invoice/:id").get(function(req,res){

    sql = "SELECT * FROM `INVOICE_VIEW` WHERE order_id = "+req.params.id;
    database.query(sql,(err,result)=>{
        if(err){
            result[0] = 'error';
        }
        res.send(result[0]);
    });
});

app.route("/api/dashboard/").get(function(req,res){

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

app.post('/api/changepassword',(req, res) => {

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

app.post('/api/login',function(req,res){
    user = req.body.username;
    pass = req.body.password;
    sql = "SELECT * from admins where email = '"+user+"' AND password = '"+pass+"'";
    database.query(sql,(err,result)=>{
        if(err){
            res.send("error");
        }else{
            token = randomstring.generate(32);
            sql = "UPDATE admins SET token='"+token+"' WHERE uid= "+result[0].uid;
            database.query(sql,(err,result)=>{
                if(err){
                    res.send("error");
                }else{
                    if(result)
                        res.send(token);
                    else
                        res.send("error");
                }
            })
            
        }
    })

})