require('dotenv-safe').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.SYSTEM_URL_BASE).then(() => {}).catch((err) => {
    console.log(err)
});

module.exports = mongoose;