process.env.TZ = 'America/Sao_Paulo';

const express = require('express');
require('express-async-errors');
require('dotenv-safe').config();
const path = require("path");
const cors = require('cors');
const apiRouter = require('./src/routes');
const loginRouter = require('./src/routes/loginRouter');
const checkToken = require('./src/middlewares/checkToken');
const bodyParser = require('body-parser');
const datahora = require('./src/plugins/datahora');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
const porta = process.env.PORT || 80;

app.use((err, req, res, next) => {
    console.log('Erro na API: ' + err);
    return res.json({
        status: "Erro"
    });
});

app.use('/api', apiRouter);
app.use('/login', loginRouter);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(porta, () => {
    console.clear();
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});