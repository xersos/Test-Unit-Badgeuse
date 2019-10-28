let express = require('express');
let router = express.Router();
require('../../middlewares/user/alerte')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : Alerte');
});

module.exports = router;