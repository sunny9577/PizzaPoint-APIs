//authenticator
const database = require('./db');

module.exports = function auth(req,res,next){

    if(req.headers.authorization == undefined){
        res.status(403).json({
            status: "failed",
            message: "No auth token found",
            response: null
        });
    }
    else{
        var bearer = req.headers.authorization.split(" ");
        var token = bearer[1];

        var sql = "SELECT cust_id  FROM users WHERE app_token = '" + token+"';";
        database.query(sql, function(err, result) {
            if(err){
                console.log(err);
                res.status(403).json({
                    status: "failed",
                    message: "unauthorized",
                    response: null
                });
            }
            else {
                if(result.length == 0){
                    res.status(403).json({
                        status: "failed",
                        message: "No Match",
                        response: null
                    });
                }else{
                    res.locals.cust_id = result[0].cust_id;
                    next();
                }
            }
        });
    }
}