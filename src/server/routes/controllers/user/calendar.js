let express = require('express');
let router = express.Router();
require('../../middlewares/user/calendar')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : calendar');
});

module.exports = router;