let express = require('express');
let router = express.Router();
require('../../middlewares/user/absence')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : Absence');
});

module.exports = router;