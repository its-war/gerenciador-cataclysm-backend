require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const WowAuthorization = require('../models/WowAuthorization');
module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            res.send({authorization: false});
        }else{
            WowAuthorization.findOne({chave: decoded.chave}).then((user) => {
                if(user){
                    req.user = user;
                    next();
                }else{
                    res.send({authorization: false});
                }
            });
        }
    });
}