const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookie = require('cookie-parser');
const app = express();
const hbs = require('hbs');
const { Client } = require('pg');
const dotenv = require('dotenv').config();
const pool = require('./databasepg');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passportConfig');
const flash = require('express-flash');
const helpers = require('./components/hbsHelpers');

initializePassport(passport);

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {});

/* hbs.registerHelper('loopit', function (n, block) {
  const count = '';
  for (const i = 0; i < n; ++i) count += block.fn(i);
  return count;
}); */

for (let helper in helpers) {
  hbs.registerHelper(helper, helpers[helper]);
}

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// access data (req.body) from client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(logger('dev'));
app.use(
  session({
    // sign the session id cookie
    secret: process.env.SESSION_SECRET,

    // should we resave our session variables if nothing has changed
    resave: false,

    // no need to save empty session
    saveUninitialized: false,

    /*     cookie: {
      maxAge: process.env.SESSION_MAXAGE,
    }, */
  })
);
app.use(flash());
app.use(passport.session());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
