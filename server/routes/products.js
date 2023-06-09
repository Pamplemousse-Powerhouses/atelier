const { products } = require('../controllers/products');

module.exports = (app) => {
  app.get('/products', products.getAll);
  app.get('/products/:product_id', products.getProductById);
  app.get('/products/:product_id/styles', products.getStyles);
};
