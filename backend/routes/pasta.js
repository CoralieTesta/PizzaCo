const express = require('express');
const router = express.Router();

const pastaCtrl = require('../controllers/pasta');

router.get('/allPastas', pastaCtrl.getAll)
router.get('/pasta/:_id', pastaCtrl.getById)
router.delete('/delete/:_id',pastaCtrl.delete)
router.post('/create/', pastaCtrl.create)
router.put('/update/:_id', pastaCtrl.update)

module.exports = router;