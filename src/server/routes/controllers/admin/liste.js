let express = require('express');
let router = express.Router();
require('../../middlewares/admin/liste')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : liste');
});

module.exports = router;