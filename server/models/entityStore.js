let items = [];
let isSeeded = false;

const seed = (initialData = []) => {
  if (isSeeded) {
    return items;
  }

  const nextItems = Array.isArray(initialData) ? initialData : [];

  items = nextItems.map((item, index) => ({
    ...item,
    id: item.id ?? `item-${index + 1}`,
  }));

  isSeeded = true;
  return items;
};

const getAll = () => items;

const getById = (id) => items.find((item) => item.id === id);

module.exports = {
  seed,
  getAll,
  getById,
};
