const express = require('express');
const router = express.Router();

const pizzaCtrl = require('../controllers/pizza');

router.get('/allPizzas', pizzaCtrl.getAll)
router.get('/pizza/:_id', pizzaCtrl.getById)
router.delete('/delete/:_id',pizzaCtrl.delete)
router.post('/create/', pizzaCtrl.create)
router.put('/update/:_id', pizzaCtrl.update)

module.exports = router;