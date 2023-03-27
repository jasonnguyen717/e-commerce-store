const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);

/* router.delete("/:id", controller.deleteProduct); */

module.exports = router;
