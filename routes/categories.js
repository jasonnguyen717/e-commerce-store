const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.get('/headphones', function (req, res, next) {
  res.render('categories/headphones', { title: 'VMJJ' });
});

router.post('/headphones', controller.getProductId);
router.post('/keyboards', controller.getProductId);
router.post('/mice', controller.getProductId);
router.post('/monitors', controller.getProductId);
router.post('/mousepads', controller.getProductId);

router.get('/keyboards', function (req, res, next) {
  res.render('categories/keyboards', { title: 'VMJJ' });
});

router.get('/mice', function (req, res, next) {
  res.render('categories/mice', { title: 'VMJJ' });
});

router.get('/monitors', function (req, res, next) {
  res.render('categories/monitors', { title: 'VMJJ' });
});

router.get('/mousepads', function (req, res, next) {
  res.render('categories/mousepads', { title: 'VMJJ' });
});

router.delete('/headphones', controller.removeProductById);
router.delete('/mousepads', controller.removeProductById);
router.delete('/keyboards', controller.removeProductById);
router.delete('/monitors', controller.removeProductById);

module.exports = router;
