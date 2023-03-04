const {systemAuthorization} = require('../database');
const Schema = systemAuthorization.Schema;
const ObjectId = Schema.ObjectId;

const WowAuthorization = new Schema({
    idUser: ObjectId,
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    chave: {
        type: String,
        require: true
    },
    registro: {
        type: String,
        require: true
    },
    ativo: {
        type: Boolean,
        default: false
    },
    loginAtual: {
        type: String,
        default: null
    }
});

systemAuthorization.model('wowauthorization', WowAuthorization);

module.exports = systemAuthorization.model('wowauthorization');