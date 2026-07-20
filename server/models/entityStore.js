/**
 * Shared in-memory store for products.
 * Person 2 seeds from productsSeed.js on first list request.
 */

let entities = [];
let nextId = 1;
let seeded = false;

function getAll() {
  return [...entities];
}

function getById(id) {
  const numId = Number(id);
  return entities.find((item) => item.id === numId) || null;
}

function create(data) {
  const item = {
    id: nextId++,
    ...data,
  };
  entities.push(item);
  return item;
}

function remove(id) {
  const numId = Number(id);
  const index = entities.findIndex((item) => item.id === numId);
  if (index === -1) return false;
  entities.splice(index, 1);
  return true;
}

function seed(samples = []) {
  if (seeded) return;
  samples.forEach((sample) => create(sample));
  seeded = true;
}

function reset() {
  entities = [];
  nextId = 1;
  seeded = false;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  seed,
  reset,
};
