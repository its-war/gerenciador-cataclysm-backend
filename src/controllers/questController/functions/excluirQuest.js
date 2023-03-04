const database = require('../../../database');
module.exports = async (req, res) => {
    let {id} = req.body;
    let sql = 'delete from quest_template where id = ?';
    database.emucoachWorld.query(sql, [id], (err, result, fields) => {
        if(err){
            console.log(err);
        }
        return res.sendStatus(200);
    })
}