require('../../../config/database');
let tokenList = require ('../../../config/tokenList');

module.exports = function (router) {

    router.post('/', (req, res) => {
        console.log('CALENDAR');
        if(tokenList.checkToken(req.body.token)) {


            const action = req.body.action;
            let id_user = req.body.id_user;

            switch (action) {

                case 'getMonth' :
                    console.log('CALENDAR - getMonth');
                    db.query('SELECT SUBSTR(a.absence_date, 1, 10) AS day, ' +
                        'a.id_status AS status, ' +
                        'r.nom_reason AS reason, ' +
                        'a.half_day AS half ' +
                        'FROM absences a ' +
                        'INNER JOIN reason r ' +
                        'ON a.id_reason = r.id_reason ' +
                        'WHERE id_user = ? ', [id_user], (err, resultat) => {

                        if (err) {
                            res.json({
                                success: false
                            });
                            console.log("Calendar calendrier renvoie error pour getMonth : ");
                            console.log(err);
                            // throw err;
                        } else {
                            res.json({
                                success:true,
                                list: resultat
                            });
                            /*
                            console.log("Calendar affichage resultat calendrier getMonth : ");
                            console.log(resultat);
                            */
                        }
                    });
                    break;

                case 'getWeek' :
                    console.log('CALENDAR - getWeek');
                    db.query('SELECT SUBSTR(b.start_point, 1, 10) AS startHeure, ' +
                        'SUBSTR(b.start_point, 12, 19) AS startMinute, ' +
                        'SUBSTR(b.end_point, 1, 10) AS endHeure, ' +
                        'SUBSTR(b.end_point, 12, 19) AS endMinute ' +
                        'FROM badger b ' +
                        'WHERE id_user = ?', [id_user], (err, resultat) => {
                        // 'WHERE id_user = ? AND b.end_point IS NOT NULL', [id_user], (err, resultat) => {

                        if (err) {
                            res.json({
                                success: false
                            });
                            console.log("Calendar calendrier renvoie error pour getWeek : " + err);
                            console.log(err);
                            // throw err;

                        } else {

                            res.json({
                                success: true,
                                list: resultat
                            });
                            /*
                            console.log("Calendar affichage resultat calendrier getWeek : ");
                            console.log(resultat);
                             */
                        }
                    });
                    break;
            }
        } else {
            res.json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
            console.log("Calendar pas d'accès au calendrier : ")
;        }
    });
};
