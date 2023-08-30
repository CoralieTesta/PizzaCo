const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/bookingSettings');

router.get('/getLunch', ctrl.getLunch)
router.get('/getDiner', ctrl.getDiner)
router.put('/update/:_id', ctrl.update)

module.exports = router;