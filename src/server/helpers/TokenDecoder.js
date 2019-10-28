var jwtDecode = require('jwt-decode');


exports = module.exports = {

    isAdmin: function isAdmin(token){
        return jwtDecode(token)['admin'];
    },

    isSameUser: function isSameUser(token, idUser){
        return jwtDecode(token)['id_user'] == idUser
    }
}
