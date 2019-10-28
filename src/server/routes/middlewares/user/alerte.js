require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');

    module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('ALERTE');
        if(tokenList.checkToken(req.body.token)) {

            const action = req.body.action;

            switch (action) {

                // GET ALL DISCONNECT TIME OF USER CONNECTED
                case 'getDataAlerte':
                    console.log('ALERTE - getDataAlerte');

                    let id_user = req.body.id_user;
                    db.query('SELECT * ' +
                        'FROM badger ' +
                        'WHERE id_user = ? ' +
                        'AND end_point IS NULL ' +
                        'AND start_point < current_date ' +
                        'AND start_point > (current_date() - 3) ' +
                        'ORDER BY start_point DESC ' +
                        'LIMIT 1'
                        , [id_user], (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'error'
                                });
                                console.log(err);
                            } else {
                                if (rows.length > 0) {
                                    res.json({user: rows[0], success: true});
                                } else {
                                    res.json({succes: false});
                                }
                            }
                        });
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
