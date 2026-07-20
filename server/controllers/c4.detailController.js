const { getAll, getById, seed } = require('../models/entityStore');
const productsSeed = require('../models/productsSeed');

function ensureSeeded() {
  if (getAll().length === 0) {
    seed(productsSeed);
  }
}

exports.getById = (req, res) => {
  try {
    ensureSeeded();

    const product = getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};
