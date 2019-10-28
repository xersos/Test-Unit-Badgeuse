require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');


module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('LIST');
        if(tokenList.checkToken(req.body.token)) {


            const action = req.body.action;

            switch (action) {

                // Get the user list for see the presence
                case 'getUserList':
                    console.log('LIST - getUserList');


                    let content = [];
                    db.query('SELECT ' +
                        'users.id_user AS userId, ' +
                        'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' +
                        'IF(badger.id_point IS NULL,0,1) AS presence ' +
                        '' +
                        'FROM users ' +
                        '' +
                        'INNER JOIN users_extend ON users.id_user = users_extend.id_user ' +
                        'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NULL AND start_point > CURRENT_DATE) badger ON users.id_user = badger.id_user ' +
                        '' +
                        // 'GROUP BY userId ' +
                        '' +
                        'ORDER BY userName'
                        , content, (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'Une erreur est survenue lors de la requête vers la base de données.'
                                });
                                console.log(err);
                            }

                            if (rows.length > 0) {
                                res.json({
                                    success: true,
                                    list: rows
                                });
                            } else {
                                res.json({
                                    success: false,
                                    message: "Nous n'avons rien trouver dans la base de données."
                                });
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


