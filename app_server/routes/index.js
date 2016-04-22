var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
// var auth = jwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: 'payload'
// });
var ctrlOnsemble = require('../controllers/stage');
var ctrlAuth = require('../controllers/authentication');

router.get('/', ctrlOnsemble.home);
router.get('/stage', ctrlOnsemble.stage);
router.get('/upload', ctrlOnsemble.upload);
// router.get('/stage/:userid', ctrOnsemble.user);
router.get('/discover', ctrlOnsemble.discover);
//
// authentication
router.post('/register', ctrlAuth.register);
router.get('/login', ctrlOnsemble.login);
router.post('/login', ctrlAuth.login);

module.exports = router;
