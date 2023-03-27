const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controller');
const initializePassport = require('../passportConfig');

// server side
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('/', { title: 'VMJJ', username: myUser });
  } else {
    res.render('index', { title: 'VMJJ' });
  }
});

router.get('/index', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('index', { title: 'VMJJ', username: myUser });
  } else {
    res.render('index', { title: 'VMJJ' });
  }
});

router.get('/register', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('register', { title: 'registration', username: myUser });
  } else {
    res.render('register', { title: 'registration' });
  }
});

router.get('/cart', controller.notLoggedIn, controller.getOrders);

router.get('/QnA', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('QnA', { title: 'QnA', username: myUser });
  } else {
    res.render('QnA', { title: 'QnA' });
  }
});

router.get('/about', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('about', { title: 'about', username: myUser });
  } else {
    res.render('about', { title: 'about' });
  }
});

router.get('/payment', controller.notLoggedIn, function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('payment', { title: 'payment', username: myUser });
  } else {
    res.render('payment', { title: 'payment' });
  }
});

router.get('/dashboard', controller.notLoggedIn, function (req, res, next) {
  res.render('dashboard', { title: req.user.username, signedInUser: req.user.username });
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.render('signin', { signedout: 'You are logged out' });
  });
});

router.get('/signin', function (req, res, next) {
  if (req.isAuthenticated()) {
    const myUser = req.user.username;
    res.render('signin', { title: 'signin', username: myUser });
  } else {
    res.render('signin', { title: 'sign in' });
  }
});

router.post('/register', controller.regNewUser);

router.get('/register/all', controller.getUsers);
router.delete('/register/:username', controller.removeUser);

router.post('/cart/removeall', controller.removeAllProducts);
router.post('/cart/updateone', controller.addOneToQuantity);
router.post('/cart/minusone', controller.minusOneToQuantity);
router.post('/cart/removeitem', controller.removeItem);

router.put('/register/:username', controller.updateUser);

// authenticate user
router.post('/signin', controller.authUser);

module.exports = router;
