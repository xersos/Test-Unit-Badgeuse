require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');

module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('BADGER');
        if(tokenList.checkToken(req.body.token)) {

            const action = req.body.action;

            switch (action) {

                // INSERT OR UPDATE THE POINT BADGE
                case 'setPresence':
                    console.log('BADGER - setPresence');

                    let id_user = req.body.id_user;
                    let presence = !req.body.presence;
                    let message;
                    let title;

                    // set the response message
                    if (presence) {
                        title = 'Bonjour !';
                        message = 'Vous avez pointé PRESENT.';
                        console.log('BADGER - devrait pointer');
                    } else {
                        title = 'Au revoir !';
                        message = 'Vous avez pointé ABSENT.';
                        console.log('BADGER - devrait dé-pointer');
                    }

                    // add a point on db badger for START
                    if (presence) {

                        db.query('SELECT * FROM badger WHERE id_user = ? AND end_point IS NULL AND start_point > CURRENT_DATE', [id_user], (err, rows) => {

                            // if any end_point is nul today
                            if (rows.length === 0) {

                                let content_badger_start = [
                                    [id_user]
                                ];
                                db.query('INSERT INTO badger(id_user) VALUES (?)', content_badger_start, (err) => {
                                    if (err) {
                                        res.json({
                                            success: false
                                        });
                                        console.log("erreur dans la requète de mise à jour -> dépointage du user")
                                        console.log(err);
                                    } else {
                                        res.json({
                                            success: true,
                                            title: title,
                                            message: message
                                        });
                                        console.log("pointage effectué")
                                    }
                                });
                            } else {
                                res.json({
                                    success: false
                                });
                                console.log("pointage non effectué");
                                console.log("err : ");
                                console.log(err);
                                console.log("rows : ");
                                console.log(rows);
                            }
                        });
                    } else {
                        let content_badger_end = [
                            [id_user]
                        ];
                        db.query('UPDATE badger ' +
                            'SET ' +
                            'end_point = CURRENT_TIMESTAMP, ' +
                            'duration = IF(' +
                            'IF(HOUR(start_point) < 12,1,0) = 1 ' +
                            'AND IF(HOUR(CURRENT_TIME) > 14,1,0) = 1,' +
                            'TIMEDIFF( DATE_ADD(end_point, INTERVAL -1 HOUR), start_point),' +
                            'TIMEDIFF( end_point, start_point )) ' +
                            '' +
                            'WHERE start_point > CURRENT_DATE AND id_user = ? ' +
                            'AND end_point is NULL ', content_badger_end, (err) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                console.log("erreur dans la requète de mise à jour -> dépointage du user")
                                console.log(err);
                            } else {
                                res.json({
                                    success: true,
                                    title: title,
                                    message: message
                                });
                                console.log("dépointage effectué")
                            }
                        })
                    }
                    break;

                // Check if the user is in the UHA 4.0 area
                case 'getAccessBadger':
                    console.log('BADGER - getAccessBadger');


                    let ipPublic = req.body.ipPublic;
                    // let localIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // uncomment this line for prod on server
                    let localIp = '10.3.1.85'; // uncomment his line for dev on local

                    if (ipPublic === '193.50.153.129' && /10[.][03][.]1[.]\d{1,3}/.test(localIp)) {
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }

                    break

            }
        } else {
            res.json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici !'
            });
        }
    });
};

