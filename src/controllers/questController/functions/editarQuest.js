const database = require('../../../database');
module.exports = async (req, res) => {
    let {id, title, objectives, details, EndText, OfferRewardText, RequestItemsText, CompletedText,
        method, note, level, minlevel, maxlevel, requiredclasses, requiredRaces, PrevQuestId,
        NextQuestID, Flags, RewardItemId1, RewardItemId2, RewardItemId3, RewardItemId4, RewardItemCount1,
        RewardItemCount2, RewardItemCount3, RewardItemCount4, idOriginal} = req.body;

    if(id !== idOriginal){
        database.emucoachWorld.query('CREATE TEMPORARY TABLE tmptable_quest_template SELECT * FROM quest_template WHERE id = ?;', [idOriginal], () => {
            database.emucoachWorld.query('UPDATE tmptable_quest_template SET id = ?;', [id], () => {
                database.emucoachWorld.query('INSERT INTO quest_template SELECT * FROM tmptable_quest_template;', () => {
                    database.emucoachWorld.query('DROP TEMPORARY TABLE IF EXISTS tmptable_quest_template;', () => {
                        return res.send({resultado: [], duplicate: true});
                    });
                });
            });
        });
    }else{
        let sql = 'update quest_template set ' +
            'title = ?, objectives = ?, details = ?, EndText = ?, OfferRewardText = ?, RequestItemsText = ?,' +
            ' CompletedText = ?, method = ?, note = ?, level = ?, minlevel = ?, maxlevel = ?, requiredclasses = ?,' +
            ' requiredRaces = ?, PrevQuestId = ?, NextQuestID = ?, Flags = ?, RewardItemId1 = ?, RewardItemId2 = ?,' +
            ' RewardItemId3 = ?, RewardItemId4 = ?, RewardItemCount1 = ?, RewardItemCount2 = ?, RewardItemCount3 = ?,' +
            ' RewardItemCount4 = ?' +
            ' where id = ?'
        database.emucoachWorld.query(sql, [title, objectives, details, EndText, OfferRewardText, RequestItemsText, CompletedText,
            method, note, level, minlevel, maxlevel, requiredclasses, requiredRaces, PrevQuestId,
            NextQuestID, Flags, RewardItemId1, RewardItemId2, RewardItemId3, RewardItemId4, RewardItemCount1,
            RewardItemCount2, RewardItemCount3, RewardItemCount4, idOriginal], (err,result,fields) => {
            return res.send({resultado: result, duplicate: false});
        });
    }
}