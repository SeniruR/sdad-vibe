exports.getById = (req, res) => {
  res.status(501).json({ message: 'Not implemented — Person 4 (C4)' });
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