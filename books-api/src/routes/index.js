const router = require('express').Router();
const bookRoute = require('./api');

router.use('/book', bookRoute);
module.exports = router;
