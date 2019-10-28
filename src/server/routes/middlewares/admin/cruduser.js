require('../../../config/database');
const Errors = require('../../../error/errors');
const HttpStatus = require('http-status-codes');
let tokenList = require('../../../config/tokenList');
var TokenDecoder = require('../../../helpers/TokenDecoder')

/**
 *  CrudUser for add/edit/delete user in db for 
 *  the student card.
 *  Processes it into our DB to change user state.
 *  No intermediate step like login.js.
 * @param router
 */
function crudUser(router) {
    router.post('/', addUser)
    router.put('/', editUser)
    router.delete('/', deleteUser)
    router.get('/', getUser)
}


/**
 * The add function allows administrators to add a user but also sets his / her uuid.
 * @param {*} request 
 * @param {*} response 
 */
function addUser(request, response) {
    //TODO : remove the body.body that comes from front side (cruduser.service.ts)
    //console.log(request.body);
    //console.log(request.body.body.user);
    //console.log(request.body.body.token);

    if (!tokenList.checkToken(request.body.token) || !TokenDecoder.isAdmin(request.body.token)) {
        response.status(HttpStatus.FORBIDDEN).send({
            message: "Utilisateur non autorisé"
        })
        return
    }
    const adduser_value = request.body.user;



    return new Promise((resolve, reject) => { //* Add to the users table our different information about adding our new users
            db.query("INSERT INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES (?, ?, ?, ?);", [adduser_value['prenom_user'], adduser_value['nom_user'], adduser_value['mail_user'],
                    adduser_value['id_role']
                ],
                (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                });
        })
        .catch((err) => {
            console.log(err)
        })

        .then(() => {
            new Promise((resolve, reject) => {
                db.query("SELECT LAST_INSERT_ID()", //* Retrieve the previously inserted id. 
                    (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
            })
        })
        .catch((err) => {
            console.log(err)
        })

        .then((results) => {
            new Promise((reject) => { //* Get the id to add the uuid to the users_extend table and its group_id.
                db.query("INSERT INTO `users_extend` (`id_user`, `id_group`,`card`) VALUES (?, ?, ?);", [
                        [results],
                        [adduser_value['id_group']],
                        [adduser_value['card']]
                    ],
                    (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        response.status(HttpStatus.OK).send({
                            message: results ? "Success" : "Failed"
                        })
                    });
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
function editUser(request, response) {
    //TODO : remove the body.body that comes from front side (cruduser.service.ts)
    //console.log(request.body);
    //console.log(request.body.body.user);
    //console.log(request.body.body.token);

    if (!tokenList.checkToken(request.body.token) || !TokenDecoder.isAdmin(request.body.token)) {
        response.status(HttpStatus.FORBIDDEN).send({
            message: "Utilisateur non autorisé"
        })
        return
    }
    const edituser_value = request.body.user; //* Allows administrators to edit student information.
    console.log(edituser_value)
    return new Promise((reject) => {
        db.query("UPDATE users u, users_extend ue SET u.prenom_user = ?, u.nom_user = ?, u.mail_user = ?, u.id_role = ?, ue.card = ?, ue.id_group = ? " +
            " WHERE u.id_user = ue.id_user AND u.id_user = ? ;", [edituser_value['prenom_user'], edituser_value['nom_user'], edituser_value['mail_user'], edituser_value['id_role'], edituser_value['card'], edituser_value['id_group'],
                edituser_value['id_user']
            ],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                response.status(HttpStatus.OK).send({
                    message: results ? "Success" : "Failed"
                })
            });
    })
}
/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
function deleteUser(request, response) {
    if (!tokenList.checkToken(request.body.token) || !TokenDecoder.isAdmin(request.body.token)) {
        response.status(HttpStatus.FORBIDDEN).send({
            message: "Utilisateur non autorisé"
        })
        return
    }
    const deleteuser_value = request.body.id_user; //* Allows the deletion of a student in the database. Deletes in the user table as well as in the users_extend.
    db.query("DELETE b FROM badger b WHERE b.id_user = ?;DELETE ue FROM users_extend ue WHERE ue.id_user = ?;DELETE u FROM users u WHERE u.id_user = ?", [deleteuser_value, deleteuser_value, deleteuser_value],
        (err, results) => {
            if (err) {
                (dbError(err, "deleteUser", response));
            }
            response.status(HttpStatus.OK).send({
                message: results ? "Success the user" + deleteuser_value : "Failed"
            }) //* Retrieve the results of the delete request.
        });
}

/**
 * Retrieve all user present on the table user/user_extend in the database.
 * @param {*} request 
 * @param {*} response 
 */
function getUser(request, response) {
    //TODO : add the ability to send a body with the token to secure
    /*
    console.log(request);
    console.log(request.body.body.user);
    console.log(request.body.body.token);

    if (!tokenList.checkToken(request.body.body.token) || !TokenDecoder.isAdmin(request.body.body.token)) {
        response.status(HttpStatus.FORBIDDEN).send({
            message: "Utilisateur non autorisé"
        })
        return
    }
     */
    db.query("SELECT *, ue.card FROM users u INNER JOIN users_extend ue ON u.id_user = ue.id_user;",
        (err, results) => {
            if (err) {
                (dbError(err, "deleteUser", response));
            }
            response.status(HttpStatus.OK).send(results)
        });

}


/**
 * 
 * @param {*} err 
 * @param {*} from 
 * @param {*} res 
 */
function dbError(err, from, res) {
    if (err instanceof Errors.NotFound) {
        // Returns a 404 with err.message in payload
        return res.status(HttpStatus.NOT_FOUND).send({
            status: 404,
            message: err.message,
            from: from
        }); // 404
    }
    // else it must be a 500, db error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: 500,
        message: err.message,
        from: from
    }); // 500
}

module.exports = crudUser;
