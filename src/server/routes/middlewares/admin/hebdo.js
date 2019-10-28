require ('../../../config/database');
let tokenList = require ('../../../config/tokenList');
var TokenDecoder = require('../../../helpers/TokenDecoder')


module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('HEBDO');

        if(tokenList.checkToken(req.body.token) && TokenDecoder.isAdmin(req.body.token)) {


            const action = req.body.action;

            let startDate, endDate, filterGroup, orderby, content;
            switch (action) {

                // Get the user list for graphic week with filter and order by
                case 'getUserListHebdo':
                    console.log('HEBDO - getUserListHebdo ddf');

                    startDate = req.body.startDate;
                    endDate = req.body.endDate;
                    filterGroup = req.body.filterGroup;
                    orderBy = req.body.orderBy;

                    content = [
                        [startDate],
                        [endDate],
                        [startDate],
                        [endDate],
                        [filterGroup],
                        [orderBy]
                    ];
                    db.query('SELECT ' +
                        'users.id_user AS userId, ' +
                        'CONCAT(users.nom_user, \' \', users.prenom_user) AS userName, ' + // first name + last name = userName
                        '' +
                        'users_extend.id_group AS id_group, ' +
                        '' +
                        'IFNULL(SEC_TO_TIME(SUM(TIME_TO_SEC(badger.duration))), 0) AS duration,' + // if duration is null, set zero
                        '' +
                        'absences.day ' + // It's a number of day of absence
                        '' +
                        'FROM users ' +
                        '' +
                        'LEFT JOIN users_extend ON users.id_user = users_extend.id_user ' + // join users table with users_extend table
                        'LEFT JOIN (SELECT * FROM badger WHERE end_point IS NOT NULL AND start_point BETWEEN ? AND ? ) badger ON users.id_user = badger.id_user ' + // join users table with badger table. Select only the complete line between date.
                        'LEFT JOIN (SELECT id_user, absence_date, SUM(IF(half_day = 0,1,0.5)) AS day FROM absences WHERE id_status = 1 AND absence_date BETWEEN ? AND ? GROUP BY id_user) absences ON users.id_user = absences.id_user ' + // join users table table with absence table. Select all between date and summe de absence day
                        '' +
                        'WHERE FIND_IN_SET(id_group, ?) ' + // filter group
                        '' +
                        'GROUP BY userId ' +
                        '' +
                        'ORDER BY ??, userName' // select order by
                        , content, (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                console.log(err);
                            } else {
                                console.log(rows);
                                res.json({
                                    success: true,
                                    list: rows
                                });
                            }
                        });
                break;

                // Get the user count for graphic week with filter and order by
                case 'getUserCountHebdo':
                    console.log('HEBDO - getUserListHebdo ddf');

                    filterGroup = req.body.filterGroup;

                    content = [
                        [filterGroup],
                    ];
                    db.query('SELECT ' +
                        'COUNT(*) as count ' +
                        'FROM users ' +
                        '' +
                        'LEFT JOIN users_extend ON users.id_user = users_extend.id_user ' + // join users table with users_extend table
                        '' +
                        'WHERE FIND_IN_SET(id_group, ?) ' // filter group
                        , content, (err, rows) => {
                            if (err) {
                                res.json({
                                    success: false
                                });
                                console.log('Request for user count hebdo failed');
                                console.log(err);
                            } else {
                                console.log('Request for user count hebdo succeed');
                                console.log(rows);
                                console.log(rows[0].count);
                                res.json({
                                    success: true,
                                    usersCount: rows[0].count
                                });
                            }
                        });
                    break;
            }
        } else {
            res.send('Vous n\'avez rien à faire ici !');
        }
    });
};
