const jwt = require('jsonwebtoken');

var jwtauth = function(req,res,next){
    if(req.headers.authorization==undefined){
        res.sendStatus(401);
        return;
    }
    var bearer = req.headers.authorization.split(" ");
    var token = bearer[1];
    jwt.verify(token,"secretxD",function(err,decoded){
        if(err)
            return res.sendStatus(401);

            req.user = decoded.user;
            next();
        
    })
}

module.exports = jwtauth;