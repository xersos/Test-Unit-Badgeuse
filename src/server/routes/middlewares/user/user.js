require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');
var TokenDecoder = require('../../../helpers/TokenDecoder')


module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('USER');
        if(tokenList.checkToken(req.body.token)) {
            const action = req.body.action;
            let id_user = req.body.id_user;


            switch (action) {

                // SEND ERRORTOKEN FALSE
                case 'checkToken':
                    console.log('USER - checkToken');
                    res.json({
                        errorToken: false
                    });
                    break;

                // GET ALL DATA OF USER CONNECTED
                case 'getDataUser':
                    console.log('USER - getDataUser');
                    if(!TokenDecoder.isAdmin(req.body.token) && !TokenDecoder.isSameUser(req.body.token, id_user)) {
                        res.json({
                            success: false,
                            errorToken: true,
                            message: "Utilisateur non autorisé à visionner ces informations"
                        });
                    }
                    else {
                        db.query('SELECT *, ' +
                            'users.id_user AS id_user, ' +
                            'user_groups.nom_group AS nom_group, ' +
                            'users_extend.id_group AS id_group, ' +
                            'roles.nom_role AS nom_role, ' +
                            'IF(badger.id_point IS NULL,0,1) AS presence ' +
                            '' +
                            'FROM users ' +
                            '' +
                            'INNER JOIN users_extend ON users.id_user = users_extend.id_user ' +
                            'LEFT JOIN user_groups ON users_extend.id_group = user_groups.id_group ' +
                            'LEFT JOIN roles ON users.id_role = roles.id_role ' +
                            'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NULL AND start_point > CURRENT_DATE) badger ON users.id_user = badger.id_user ' +
                            '' +
                            'WHERE users.id_user = ?'
                            , [id_user], (err, rows) => {
                                if (err) {
                                    res.json({
                                        success: false
                                    });
                                    console.log(err);
                                } else {
                                    res.json({
                                        success: true,
                                        user: rows[0]
                                    });
                                }
                            });
                    }
                    break;

                // GET ID OF USER REQUESTED
                case 'getIdUser':
                    console.log('USER - getIdUser');
                    let userName = req.body.userName;
                    db.query('SELECT * ' +
                        'FROM users ' +
                        'WHERE CONCAT(users.nom_user, \' \', users.prenom_user) = ?'
                        , [userName], (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                console.log('    getIdUser - error : ')
                                //console.log(err);
                            } else {
                                res.json({
                                    success: true,
                                    user: rows[0].id_user
                                });
                            }
                        });
                    break;

                // UPDATE THE USER GROUP
                case 'updateGroup':
                    if (!TokenDecoder.isAdmin(req.body.token)) {
                        res.json({
                            success: false,
                            errorToken: true,
                            message: "Utilisateur non autorisé"
                        });
                    }
                    else {
                        let id_group = req.body.id_group;
                        console.log('USER - updateGroup of user ' + id_user + ' to group ' + id_group);
                        db.query('UPDATE users_extend SET id_group = ? WHERE id_user = ?', [id_group, id_user], (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "    Une erreur est survenue lors de la mise à jour de l'information."
                                });
                            } else {
                                res.json({
                                    success: true,
                                    message: "L'information a bien été mise à jour."
                                });
                            }
                        });
                    }
                    break;

                case 'getPieChart':
                    console.log('USER - getPieChart');
                    if (!TokenDecoder.isAdmin(req.body.token) && !TokenDecoder.isSameUser(req.body.token, id_user)) {
                        res.json({
                            success: false,
                            errorToken: true,
                            message: "Utilisateur non autorisé à visionner ce pie chart"
                        });
                    }
                    else {
                        let startDate = req.body.startDate;
                        let endDate = req.body.endDate;

                        let content = [
                            [startDate],
                            [endDate],
                            [id_user],
                            [startDate],
                            [endDate],
                            [id_user]
                        ];

                        db.query("select sum(if(half_day=0,7,4)) as day, a.id_user, " +
                            "u.nom_user, r.nom_reason as reason " +
                            "from absences a,reason r,users u where u.id_user = a.id_user " +
                            "and a.id_reason = r.id_reason " +
                            "and absence_date between ? and ? and a.id_user = ? " +
                            "group by a.id_reason, a.id_user " +
                            "union Select SEC_TO_TIME(SUM(TIME_TO_SEC(`duration`))), b.id_user," +
                            " u.nom_user, " +
                            "'presence' as reason from badger b, users u where " +
                            "u.id_user = b.id_user " +
                            "and WEEKDAY(start_point) < 5 " +
                            "and start_point between ? and ?" +
                            "and b.id_user = ? group by b.id_user",
                            content, (err, rows) => {
                                if (err) {
                                    res.json({
                                        success: false
                                    });
                                    // throw err;
                                    console.log('getPieChart - error : ')
                                    //console.error(err);
                                } else {
                                    console.log('    query fonctionne');
                                    pieDataD = [];
                                    pieReasonD = [];

                                    rows.forEach((element, index) => {
                                        pieDataD.push(parseInt(element.day));
                                        pieReasonD.push(element.reason);
                                        //console.log(element.day);
                                        //console.log(element.reason);
                                    });
                                    res.json({
                                        success: true,
                                        pieData: pieDataD,
                                        pieReason: pieReasonD
                                    });
                                }
                                console.log("    résultat de la requete getPieChart : ")
                                //console.log(res);
                            });
                    }
                    break;


                case 'getPieChartAdmin' :
                    console.log('USER - getPieChartAdmin');
                    if (!TokenDecoder.isAdmin(req.body.token)) {
                        res.json({
                            success: false,
                            errorToken: true,
                            message: "Utilisateur non autorisé à visionner ce pie chart"
                        });
                    }
                    else {
                        let StartDate = req.body.StartDate;
                        let EndDate = req.body.EndDate;

                        const content1 = [
                            [StartDate],
                            [EndDate],
                            [StartDate],
                            [EndDate]
                        ];
                        db.query("select sum(if(half_day=0,7,4)) as day, " +
                            "r.nom_reason as reason from absences a,reason r," +
                            "users u where u.id_user=a.id_user and a.id_reason=r.id_reason " +
                            "and absence_date between ? and ? " +
                            "group by a.id_reason " +
                            "union Select SEC_TO_TIME(SUM(TIME_TO_SEC(`duration`))), " +
                            "'presence' as reason from badger b, " +
                            "users u where u.id_user=b.id_user and " +
                            "start_point between ? and ? ",
                            content1,
                            (err, rows) => {
                                if (err) {
                                    res.json({
                                        success: false
                                    });

                                    // throw err;
                                    console.log("    pieChartAdmin - error:" )
                                    //console.error(err);
                                } else {
                                    PieDataD = [];
                                    PieReasonD = [];


                                    rows.forEach(function (element) {
                                        PieDataD.push(parseInt(element.day));
                                        PieReasonD.push(element.reason);
                                        //console.log(element.day);
                                        //console.log(element.reason);
                                    });
                                    res.json({
                                        success: true,
                                        PieData: PieDataD,
                                        PieReason: PieReasonD
                                    });
                                }
                                console.log("    résultat de la requete getPieChartAdmin : ")
                                //console.log(res);
                            });
                    }
                    break;
            }

        } else {
            // res.send('Vous n\'avez rien à faire ici !');
            res.json({
                errorToken: true,
                message: 'Vous n\'avez rien à faire ici ! USER'
            });
            console.log("pas d'accès au back user.js : Vous n'avez rien à faire ici !")

        }
    });
}

