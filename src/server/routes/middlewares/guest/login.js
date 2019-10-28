require ('../../../config/database');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
let tokenList = require ('../../../config/tokenList');


module.exports = function(router) {

    router.post('/', (req, res) => {
        console.log('LOGIN');
        const action = req.body.action;

        switch (action) {

            // CHECK THE CONNECTION OF USER
            case 'tryConnect':
                const passForm = req.body.password.trim();
                const usermailForm = req.body.userMail.trim();

                // Password and Usermail min/max length
                const passLengthMin = 3,
                    passLengthMax = 255,
                    userMailLengthMin = 5,
                    userMailLengthMax = 255;

                if (usermailForm.length >= userMailLengthMin && usermailForm.length <= userMailLengthMax) {
                    if (passForm.length >= passLengthMin && passForm.length <= passLengthMax) {
                        // Read the Sql table if the userMail exist
                        db.query('SELECT * FROM users WHERE mail_user=?', [usermailForm], (err, result) => {

                            if (err) {
                                res.json
                                ({
                                    success: false,
                                    message: "Une erreur est survenue, veuillez reéssayer ultérieurement."
                                });
                                throw err;
                            }

                            if (result.length !== 0) {

                                let passFormCript = sha1('uha'+passForm);
                                let passDb = result[0].mdp_user;

                                if(passDb === null) {passDb = result[0].mdp_temp_user;}

                                // compare the password
                                if(passFormCript === passDb) {
                                    // check if the user is admin
                                    let adminActive = false;
                                    if(result[0].id_role === 3) {adminActive = true;}
                                    // generate a token
                                    const token = jwt.sign({id_user: result[0].id_user, admin: adminActive}, config.auth.SECRET_KEY, {expiresIn: '3h'});
                                    tokenList.addToken(token);
                                    res.json({
                                        success: true,
                                        message: "Vous allez être redirigé dans quelques instants.",
                                        token: token,
                                        user: {prenom_user: result[0].prenom_user, mail_user: result[0].mail_user}
                                    });
                                } else {
                                    res.json({success: false, message: "Le mot de passe est incorrect !"});
                                }
                            } else{
                                res.json({success: false, message: "Le nom de compte n'éxiste pas !"});
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "Le mot de passe doit avoir un minimum de " + passLengthMin + " caractères et ne doit pas dépasser " + passLengthMax + " caractères !"
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: "Le nom d'utilisateur doit avoir un minimum de " + passLengthMin + " caractères et ne doit pas dépasser " + passLengthMax + " caractères !"
                    });
                }
            break;

            // case 'delToken':
                // const tokenClient = req.body.token;
                // tokenList.delToken(tokenClient);
            // break
        }
    });
};
