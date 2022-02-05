const router = require('express').Router();
const userRoute = require('./api');

router.use('/user', userRoute);
module.exports = router;
