const questRouter = require('express').Router();
const {questController} = require('../controllers/index');

questRouter.get('/listar/:pagina', questController.listarQuests);
questRouter.post('/listarPorId', questController.listarPorId);
questRouter.post('/editar', questController.editarQuest);
questRouter.post('/excluir', questController.excluirQuest);
questRouter.post('/pesquisar', questController.pesquisar);

module.exports = questRouter;