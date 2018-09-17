const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const database = require('./db');
const authenticator = require('./authenticator');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const adminApp = require('./api/admin');
const productRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const categoryRoute = require('./routes/category');
const cartRoute = require('./routes/cart');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const wishlistRoute = require('./routes/wishlist');

//route backend panel api calls
app.use('/api/',adminApp);

app.use('/products', productRoute);
app.use('/orders', ordersRoute);
app.use('/category', categoryRoute);
app.use('/cart', cartRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/wishlist', wishlistRoute);

app.get('/', function(req, res) {
    res.status(200).send();
});

app.get('/status', function(req, res) {
    res.status(200).send();
});

app.put('/verify/:token',authenticator,function(req, res) {

    var sql = "UPDATE users set fcm_token = '"+ req.params.token +"' WHERE cust_id = " + res.locals.cust_id ;
    database.query(sql);
    res.status(200).send();

});

//gift vouchers
app.get("/voucher/:action/:code/",authenticator, function(req, res) {

    switch (req.params.action) {
        case "apply":
            var sql = "UPDATE gift_vouchers SET voucher_status = 'deactivated' WHERE voucher_code = '" + req.params.code +"' AND voucher_status = 'active'";
            database.query(sql, function(err,result) {

                if(result.affectedRows!=1){
                    res.status(200).json({
                        status: "failed",
                        message: "Invalid Gift voucher",
                        data: null
                    });
                }else{
                    sql = "SELECT * FROM gift_vouchers WHERE voucher_code = '" + req.params.code +"'";
                    database.query(sql, function(err, result) {

                        res.status(200).json({
                            status: "ok",
                            message: "",
                            data: result
                        });
                    });
                }
            });
            break;
        case "check":
            sql = "SELECT * FROM gift_vouchers WHERE voucher_code = '" + req.params.code + "' AND voucher_status = 'active'";
            database.query(sql, function(err, result) {

                if(err || result.length==0){
                    res.status(200).json({
                        status: "failed",
                        message: "Invalid Gift voucher",
                        data: null
                    });
                }else{
                    res.status(200).json({
                        status: "ok",
                        message: "",
                        data: result
                    });
                }
            });
            break;
        default:
            res.status(404).json({
                status: "failed",
                message: "Unknown error",
                response: null
            });
    }

});

//promo code
app.get("/promo/:code", authenticator, function(req, res) {

    var sql = "SELECT * FROM promo_codes WHERE promo_code = '" + req.params.code + "' AND status = 'active'";
    database.query(sql, function(err, result) {

        if (result.length === 0) {
            res.status(200).json({
                status: "failed",
                message: "Not valid",
                data: null
            });
        } else {
            res.status(200).json({
                status: "ok",
                message: "Code Applied",
                data: result
            });
        }

    });

});

//app
app.get("/app", function(req, res) {

    var sql = "SELECT *  FROM banners WHERE active = 0 ORDER BY banner_id DESC;SELECT cat_name FROM categories ORDER BY priority DESC;SELECT * FROM products ORDER BY product_id DESC;";
    database.query(sql, [2, 1], function(err, result) {
        if (err) {
            console.log(err);
            res.status(200).send({
                status: "failed",
                message: "",
                data: null
            });
        }else{
            var data = {
                banners: result[0],
                categories: result[1],
                products: result[2]
            }
            res.status(200).send({
                status: "ok",
                message: "",
                data: [data]
            });
        }
    });

});

//profile
app.get('/user/',authenticator, function(req, res) {

    var sql = "SELECT * FROM orders WHERE cust_id = " + res.locals.cust_id + ";SELECT * FROM orders WHERE cust_id = " + res.locals.cust_id + " AND status = 'pending';SELECT * FROM orders WHERE cust_id = " + res.locals.cust_id + " AND status = 'delivered';";
    database.query(sql, [2, 1], function(err, result) {
        if(err){
            res.status(200).json({
                status: "failed",
                message: "",
                data: null
            });
        }else{
            res.status(200).send({
                totalOrders: result[0].length,
                pendingOrders: result[1].length,
                completedOrders: result[2].length
            });
        }
    });
});

//cities
app.get('/cities/',function(req,res){

    var sql = "SELECT * FROM cities join states on cities.state_id = states.state_id;";
    database.query(sql,function(err,result){
        if(err){
            console.log(err);
            res.status(200).json({
                status: "failed",
                message: "",
                data: null
            });
        }else{
            res.status(200).send({
                status: "ok",
                message: "",
                data: result
            });
        }
    })
});

module.exports = app;