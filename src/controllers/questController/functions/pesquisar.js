const database = require('../../../database');
module.exports = async (req, res) => {
    let {texto} = req.body;

    texto = '%' + texto + '%';
    let sql = "select id, title, objectives, details, EndText, OfferRewardText, RequestItemsText, CompletedText from quest_template where title like ?"
    database.emucoachWorld.query(sql, [texto], (err, result, fields) => {
        return res.send({resultado: result});
    });
}