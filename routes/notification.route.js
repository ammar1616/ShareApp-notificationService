const express = require('express');
const authentication = require('../middlewares/authentication.js');
const notification = require('../middlewares/notification.js');
const notifyResetPassword = require('../controllers/notifyResetPassword.service.js');
const notifyBorrowingRequest = require('../controllers/notifyBorrowingRequest.service.js');
const notifyDueDateApproaching = require('../controllers/notifyDueDateApproaching.service.js');
const notifyDamageClaim = require('../controllers/notifyDamageClaim.service.js');

const router = express.Router();

router.post('/resetPassword', notification(process.env.ENABLE_NOTIFICATIONS), notifyResetPassword);
router.post('/borrowingRequest', notification(process.env.ENABLE_NOTIFICATIONS), notifyBorrowingRequest);
router.post('/dueDateApproaching', notification(process.env.ENABLE_NOTIFICATIONS), notifyDueDateApproaching);
router.post('/damageClaim', notification(process.env.ENABLE_NOTIFICATIONS), notifyDamageClaim);

module.exports = router;