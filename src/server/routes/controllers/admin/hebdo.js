let express = require('express');
let router = express.Router();
require('../../middlewares/admin/hebdo')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : hebdo');
});

module.exports = router;