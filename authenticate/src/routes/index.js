const router = require('express').Router();
const { route } = require('express/lib/application');
const userRoute = require('./api');

router.use('/user/', userRoute);
module.exports = router;
