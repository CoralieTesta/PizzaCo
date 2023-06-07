const express = require('express');
const router = express.Router();

const orderCtrl = require('../controllers/order');

router.get('/allOrders', orderCtrl.getAll)
router.post('/create/', orderCtrl.create);
router.delete('/delete/:_id',orderCtrl.delete)
router.get('/order/:_id', orderCtrl.getById)
router.put('/update/:_id', orderCtrl.update)

module.exports = router;