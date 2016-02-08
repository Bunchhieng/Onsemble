var express = require('express');
var router = express.Router();
var mainCtrl = require('../controllers/main');

/* Locations pages */
router.get('/', mainCtrl.homelist);
router.get('/discover', mainCtrl.discoverPage);
router.get('/stage', mainCtrl.stagePage);

/* Other pages */
/*router.get('/about', ctrlOthers.about);*/

module.exports = router;
