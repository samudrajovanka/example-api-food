const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foodsController'); // mengimport module foods controller

router.get('/', foodsController.getFoods); // route untuk mendapatkan data makanan
router.post('/', foodsController.postFood); // route untuk menambahkan makanan
router.put('/:foodId', foodsController.updateFood); // route untuk memperbarui makanan terkait
router.delete('/:foodId', foodsController.deleteFood); // route untuk menghapus makanan terkait

module.exports = router;
