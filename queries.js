const getAllProductsQuery = 'SELECT * FROM products';
const getProductByIdQuery = 'SELECT * FROM products WHERE id = $1';
const getAllUsersQuery = 'SELECT * FROM users';
const checkUserNameExists = 'SELECT s FROM users s WHERE s.username = $1';
const addUser = 'INSERT INTO users (username, password) VALUES ($1, $2)';
const removeUser = 'DELETE FROM users WHERE username = $1';
const getUserById = 'SELECT * FROM users WHERE username = $1';
const updateUser = 'UPDATE users SET password = $1 WHERE username = $2';
const productsToOrders =
  'INSERT INTO orders(id, category, title, quantity, image, price, total) SELECT id, category, title, quantity, image, price, total FROM products WHERE id = $1';
const removeProductByIdQuery = 'DELETE FROM orders WHERE id = $1';
const getAllOrderProductsQuery = 'SELECT * FROM orders ORDER BY id';
const removeAllProductsQuery = 'DELETE FROM orders';
const addOneToQuantityQuery = 'UPDATE orders SET Quantity = Quantity + 1 WHERE id = $1';
const updatePriceQuery = 'UPDATE orders SET Total = Price + Total WHERE id = $1';
const minusOneToQuantityQuery = 'UPDATE orders SET Quantity = Quantity - 1 WHERE id = $1';
const minusPriceQuery = 'UPDATE orders SET Total = Total - Price WHERE id = $1';
const sumQuery = 'SELECT SUM(total) FROM orders';
const removeItemQuery = 'DELETE FROM orders WHERE id = $1';
const checkQuantityIsZero = 'SELECT quantity FROM orders WHERE id = $1';

module.exports = {
  getProductByIdQuery,
  getAllProductsQuery,
  getAllUsersQuery,
  checkUserNameExists,
  addUser,
  removeUser,
  getUserById,
  updateUser,
  productsToOrders,
  removeProductByIdQuery,
  getAllOrderProductsQuery,
  removeAllProductsQuery,
  addOneToQuantityQuery,
  updatePriceQuery,
  minusOneToQuantityQuery,
  minusPriceQuery,
  sumQuery,
  removeItemQuery,
  checkQuantityIsZero,
};
