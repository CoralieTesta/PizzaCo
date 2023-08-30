const express = require('express');
const router = express.Router();

const dessertCtrl = require('../controllers/dessert');

router.get('/allDesserts', dessertCtrl.getAll)
router.get('/dessert/:_id', dessertCtrl.getById)
router.delete('/delete/:_id',dessertCtrl.delete)
router.post('/create/', dessertCtrl.create)
router.put('/update/:_id', dessertCtrl.update)


module.exports = router;