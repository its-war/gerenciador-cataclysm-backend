const database = require('../../../database');
module.exports = async (req, res) => {
    let pagina = parseInt(req.params.pagina);
    if(isNaN(pagina)){
        return res.send({resultado: [], totalPaginas: 0});
    }

    let perPage = 25;
    let offset = (parseInt(req.params.pagina) - 1) * perPage;
    database.emucoachWorld.query('select ' +
        'id, title, objectives, details, EndText, OfferRewardText, RequestItemsText, CompletedText' +
        ' from quest_template order by id limit ?, ?', [offset, perPage], await function(err, result, fields) {
        if(result){
            database.emucoachWorld.query('select count(*) as totalPaginas from quest_template', (err, resultQueryPage, fields) => {
                return res.send({resultado: result, totalPaginas: Math.ceil(resultQueryPage[0].totalPaginas / perPage)});
            });
        }else return res.send({resultado: [], totalPaginas: 0});
    });
}