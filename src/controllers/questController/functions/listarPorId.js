const database = require('../../../database');

module.exports = async (req, res) => {
    let id = req.body.id;
    if(isNaN(parseInt(id)) || id <= 0){
        res.send({resultado: []});
    }
    database.emucoachWorld.query('select ' +
        'id, title, objectives, details, EndText, OfferRewardText, RequestItemsText, CompletedText,' +
        'method, note, level, minlevel, maxlevel, requiredclasses, requiredRaces, PrevQuestId, NextQuestID, Flags, RewardItemId1, RewardItemId2, RewardItemId3, RewardItemId4, RewardItemCount1, RewardItemCount2, RewardItemCount3, RewardItemCount4' +
        ' from quest_template where id = ?', [id],
        (err, result, fields) => {
            if(result) return res.send({resultado: result});
            else return res.send({resultado: []});
        });
}