const router = require('express').Router();
const { route } = require('express/lib/application');
const userRoute = require('./api');

router.use('/urest/v1/', userRoute);
module.exports = router;
