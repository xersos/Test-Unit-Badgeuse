let express = require('express');
let router = express.Router();
require('../../middlewares/admin/cruduser')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : cruduser');
});

module.exports = router;