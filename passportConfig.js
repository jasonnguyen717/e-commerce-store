const LocalStrategy = require('passport-local').Strategy;
const pool = require('./databasepg');
const bcrypt = require('bcrypt');
const queries = require('./queries');

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    pool.query(queries.getUserById, [username], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      // finds user in the database
      if (results.rows.length > 0) {
        // pass in the user from the database
        const user = results.rows[0];
        console.log(user);
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            // return user to store into session cookie
            return done(null, user);
          } else {
            console.log('wrong pass');
            return done(null, false, { message: 'Wrong Password' });
          }
        });
      } else {
        // if there's no user in the database
        return done(null, false, { message: 'No username found' });
      }
    });
  };
  passport.use(
    new LocalStrategy(
      {
        usernameFiled: 'username',
        passwordField: 'password',
      },
      authenticateUser
    )
  );
  // stores userid into cookie
  passport.serializeUser((user, done) => done(null, user.username));

  // uses the username to obtain details in the database
  passport.deserializeUser((username, done) => {
    pool.query(queries.getUserById, [username], (err, results) => {
      if (err) {
        throw err;
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
