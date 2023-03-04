const router = require('express').Router();
const questRouter = require('./questRouter');

router.use('/quest', questRouter);

module.exports = router;