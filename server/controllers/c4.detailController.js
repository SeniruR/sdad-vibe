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
const entityStore = require('../store/entityStore');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await entityStore.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};