const express = require('express');
const router = express.Router();

const emailCtrl = require('../controllers/email');

router.post('/sendBookingEmail', emailCtrl.sendBookingEmail);
router.post('/sendBookingConfirmation', emailCtrl.sendBookingConfirmation);
router.post('/sendBookingRefusal', emailCtrl.sendBookingRefusal);

module.exports = router;