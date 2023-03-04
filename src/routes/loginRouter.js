const loginRouter = require('express').Router();
const {loginController} = require('../controllers');
const WowAuthorization = require('../models/WowAuthorization');
const bcrypt = require('bcryptjs');

loginRouter.post('/efetuar', loginController.login);
loginRouter.post('/cadastro', async (req, res) => {
    let {nome, email, username, senha} = req.body;
    let sal = bcrypt.genSaltSync(10);
    let chave = bcrypt.hashSync(Date.now() + username + email + sal + Math.random(), sal);
    senha = bcrypt.hashSync(senha, sal);
    await WowAuthorization.create({
        nome: nome,
        email: email,
        username: username,
        senha: senha,
        chave: chave,
        registro: Date.now()
    }).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send([]);
    });
});

module.exports = loginRouter;