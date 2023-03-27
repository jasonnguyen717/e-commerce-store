const pool = require('./databasepg');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passportConfig');

// authenticate user
const authUser = passport.authenticate('local', {
  successRedirect: 'dashboard',
  failureRedirect: 'signin',
  failureFlash: true,
});

// check if authenticated
function loggedIn(req, res, next) {
  // function with passport
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
}

// check if not authenticated
function notLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('signin', { message: 'You need to be logged in' });
}

// get all users from table users
const getUsers = (req, res) => {
  pool.query(queries.getAllUsersQuery, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

// get all products from products table
const getAllProducts = (req, res) => {
  pool.query(queries.getAllProductsQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//remove item from order table
const removeItem = (req, res) => {
  const { id } = req.body;
  pool.query(queries.removeItemQuery, [id], (error, results) => {
    if (error) throw error;
    res.redirect('/cart');
  });
};

//remove all products
const removeAllProducts = (req, res) => {
  pool.query(queries.removeAllProductsQuery, (error, results) => {
    if (error) throw error;

    res.redirect('/cart');
  });
};

// update quantity by id, plus one and update total
const addOneToQuantity = (req, res) => {
  const { id } = req.body;
  pool.query(queries.addOneToQuantityQuery, [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      pool.query(queries.updatePriceQuery, [id], (error, result) => {
        if (error) throw error;
        console.log(results);

        res.redirect('/cart');
      });
    }
  });
};

// check if quantity is zero
// update quantity by minus one and update total
const minusOneToQuantity = (req, res) => {
  const { id } = req.body;
  pool.query(queries.checkQuantityIsZero, [id], (error, results) => {
    if (results.rows[0].quantity < 1) {
      console.log(results.rows);
      res.redirect('/cart');
    } else {
      pool.query(queries.minusOneToQuantityQuery, [id], (error, results) => {
        if (error) throw error;
        pool.query(queries.minusPriceQuery, [id], (error, result) => {
          if (error) throw error;
          res.redirect('/cart');
        });
      });
    }
  });
};

// adds product to orders table using product id
const getProductId = (req, res) => {
  let { prod } = req.body;
  pool.query(queries.productsToOrders, [prod], (err, result) => {
    if (err) {
      res.redirect('/index');
    }
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductByIdQuery, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// add products to table orders
const addProducts = (req, res) => {
  let { prod } = req.body;
  prod = parseInt(prod);
  console.log(id);
  pool.query(queries.getProductByIdQuery, [id], (error, results) => {
    if (error) throw error;
    console.log(results.rows);
  });
};

let regNewUser = async (req, res) => {
  let { username, password, pword2 } = req.body;
  let errors = [];
  console.log({
    username,
    password,
    pword2,
  });

  if (password.length <= 6) {
    errors.push('*Password must be longer than 6 characters');
  }

  if (password != pword2) {
    errors.push('*Passwords must match');
  }

  if (errors.length > 0) {
    res.render('register', { errors: JSON.stringify(errors) });
  } else {
    let hashPw = await bcrypt.hash(password, 12);
    console.log(hashPw);

    // check if username exists
    pool.query(queries.checkUserNameExists, [username], (error, results) => {
      if (results.rows.length) {
        errors.push('Usernamae already in use');
        return res.render('register', {
          usernameInUse: 'Username already in use',
        });
      } else {
        // add user to db
        pool.query(queries.addUser, [username, hashPw], (error, results) => {
          if (error) throw error;

          return res.render('register', {
            registered: 'Registered Successfully!',
          });
        });
      }
    });
  }
};

const removeUser = (req, res) => {
  const username = req.params.username;
  // check if user exists
  pool.query(queries.getUserById, [username], (error, results) => {
    const noUsersFound = !results.rows.length;
    if (noUsersFound) {
      res.send("User doesn't exist in the database");
    }
    // remove user by username
    pool.query(queries.removeUser, [username], (error, results) => {
      if (error) throw error;
      res.status(200).send('User removed successfully');
    });
  });
};

const removeProductById = (req, res) => {
  let { id } = req.body;
  id = parseInt(id);

  pool.query(queries.removeProductByIdQuery, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send('Product removed successfully');
  });
};

const updateUser = (req, res) => {
  const username = parseInt(req.params.username);
  const { password } = req.body;

  pool.query(queries.getUserById, [username], (error, results) => {
    const noUsersFound = !results.rows.length;
    if (noUsersFound) {
      res.send("User doesn't exist in the database");
    }

    // update password by username
    pool.query(queries.updateUser, [password, username], (error, results) => {
      if (error) throw error;
      res.status(200).send('Password updated successfully');
    });
  });
};

// get all products from orders table
let getOrders = (req, res) => {
  const myUser = req.user.username;
  console.log(myUser);
  pool.query(queries.getAllOrderProductsQuery, (error, results) => {
    if (error) {
      res.render('cart', { title: 'cart', username: myUser });
    }
    pool.query(queries.sumQuery, (error, result) => {
      if (error) throw error;

      let sum = result.rows[0];

      if (results.rows.length) {
        res.render('cart', { title: 'cart', data: results.rows, subtotal: sum, username: myUser });
      } else {
        res.render('cart', { title: 'cart', noitems: 'No items in shopping cart', username: myUser });
      }
    });
  });
};

module.exports = {
  getUsers,
  getProductId,
  getAllProducts,
  getProductById,
  regNewUser,
  removeUser,
  updateUser,
  authUser,
  loggedIn,
  notLoggedIn,
  addProducts,
  removeProductById,
  getOrders,
  removeAllProducts,
  addOneToQuantity,
  minusOneToQuantity,
  removeItem,
};
