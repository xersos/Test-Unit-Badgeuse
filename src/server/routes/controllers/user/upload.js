let express = require('express');
let router = express.Router();
require('../../middlewares/user/upload')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : Upload');
});

module.exports = router;