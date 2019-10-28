let express = require('express');
let router = express.Router();
require('../../middlewares/user/user')(router);


router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('Badgeuse intelligente : user');
});

module.exports = router;