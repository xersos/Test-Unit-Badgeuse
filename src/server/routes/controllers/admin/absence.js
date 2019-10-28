let express = require('express');
let router = express.Router();
require('../../middlewares/admin/absence_admin')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : absence');
});

module.exports = router;
