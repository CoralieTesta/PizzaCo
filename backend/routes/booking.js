const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/booking');

router.post('/create/', ctrl.create)
router.get('/all', ctrl.getAll)
router.delete('/delete/:_id', ctrl.delete)
router.put('/update/:_id', ctrl.update)

module.exports = router;