const express = require('express');
const route = express.Router();
const database = require('../../db');
const randomstring = require("randomstring");

route.get('/all',(req, res) => {
    sql = 'SELECT * FROM gift_vouchers';
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/deactivate/:id',(req, res) => {
    sql = "UPDATE gift_vouchers SET voucher_status = 'deactivated' WHERE voucher_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.get('/activate/:id',(req, res) => {
    sql = "UPDATE gift_vouchers SET voucher_status = 'active' WHERE voucher_id = "+req.params.id;
    database.query(sql,function(err,result){
        console.log(err);
            res.status(200).json(result);
    });
});

route.post("/create/",function(req,res){

    total = parseInt(req.body.total);
    value = parseInt(req.body.value);

    if(total=='NaN' || value=='NaN'){
        res.send("No data passed");
        return;
    }
    
    sql = "";

    for(i=0;i<total;i++){
		gvcode = "PP"+randomstring.generate(6);
		gvpin = randomstring.generate({length:4,charset:'numeric'});
        query = "INSERT INTO gift_vouchers (voucher_code, voucher_pin, voucher_value, voucher_currency) VALUES ('"+gvcode.toUpperCase()+"', '"+gvpin+"', '"+value+"' ,'INR');";
        sql = sql+query;
    }
        
        database.query(sql,function(err,result){
            console.log(err);
            if(result){
                res.send("Voucher Created");
            }
            else{
                res.send("Failed");
            }
        })
})

module.exports = route;