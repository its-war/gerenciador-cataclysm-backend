require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const WowAuthorization = require('../../../models/WowAuthorization');
module.exports = async (req, res) => {
    let {username, senha} = req.body;

    username = username.toLowerCase();

    await WowAuthorization.findOne({username: username}).select('senha chave ativo loginAtual').then((user) => {
        if(user){
            if(bcrypt.compareSync(senha, user.senha)){
                let token = jwt.sign({chave: user.chave}, process.env.SECRET, {
                    expiresIn: '60s'
                });
                res.header('Authorization', token);
                res.send({authorization: true});
            }else{
                res.send({authorization: false});
            }
        }else{
            res.send({authorization: false});
        }
    }).catch((err) => {
        res.send({authorization: false});
    });
}