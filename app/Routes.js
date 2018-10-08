

const express   = require('express');
const router    = express.Router();

const genderizeController = require('./controllers/GenderizeController');

router.route('/genderize').get(genderizeController.genderize);

module.exports = router;
