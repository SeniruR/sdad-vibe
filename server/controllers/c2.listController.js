const { getAll, seed } = require('../models/entityStore');
const productsSeed = require('../models/productsSeed');

exports.getProducts = (req, res) => {
  try {
    if (getAll().length === 0) {
      seed(productsSeed);
    }

    res.status(200).json({ products: getAll() });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};
