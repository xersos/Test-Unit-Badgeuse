let express = require('express');
let router = express.Router();
require('../../middlewares/guest/uuid')(router);

router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : UUID');
});

module.exports = router;
