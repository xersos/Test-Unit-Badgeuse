require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');
var TokenDecoder = require('../../../helpers/TokenDecoder')


module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('ABSENCE_ADMIN');
        if(tokenList.checkToken(req.body.token) && TokenDecoder.isAdmin(req.body.token)) {

            const action = req.body.action;

            switch (action) {

                // GET ABSENCE LIST FOR ADMIN
                case 'getUserListAbsence':
                    console.log('ABSENCE_ADMIN - getUserListAbsence');
                    db.query('SELECT ' +
                        'CONCAT(users.nom_user, \' \', users.prenom_user) AS absName, ' +
                        '' +
                        'absences.ref_absence AS ref, ' +
                        'raison_refus AS refus, ' +
                        'MIN(absences.absence_date) AS minDate, ' +
                        'MAX(absences.absence_date) AS maxDate, ' +
                        'absences.half_day AS halfDay, ' +
                        'absences.comment_absences as comment, ' +
                        'absences.certificate as certificate, ' +
                        '' +
                        'reason.nom_reason AS absReason ' +
                        '' +
                        'FROM absences ' +
                        '' +
                        'INNER JOIN users ON absences.id_user = users.id_user ' +
                        'INNER JOIN reason ON absences.id_reason = reason.id_reason ' +
                        'WHERE id_status = 2 ' +
                        '' +
                        'GROUP BY ref ' +
                        '' +
                        'ORDER BY ref'
                        , (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                console.log(err);
                            } else {
                                res.json({
                                    success: true,
                                    list: rows
                                });
                            }
                        });
                    break;

                case 'getUpdateAbsence':
                    console.log('ABSENCE_ADMIN - getUpdateAbsence');

                    const ref = req.body.ref;
                    const valide = req.body.valide;
                    const refus = req.body.refus;

                    const content = [[valide], [refus], [ref]];
                    db.query('UPDATE absences SET id_status = ?, raison_refus = ? WHERE ref_absence = ? ', content, (err) => {
                        if (err) {
                            res.json({success: false});
                            console.log(err);
                        } else {
                            res.json({success: true});
                        }
                    });
                    break;

            }
        } else {
            res.json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
        }
    });
};
