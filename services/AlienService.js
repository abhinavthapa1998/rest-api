const Alien = require("../models/aliens");

const getAliens = async () => {
  // const aliens = await Alien.find();
  const aliens = Alien.aggregate([
    { $match: { id: { $gt: 8 } } },
    { $count: "Total" },
  ]);

  return aliens;
};
const getAlienById = async (id) => {
  const aliens = await Alien.findById(id);
  return aliens;
};
const createAlien = async (alien) => {
  const response = await alien.save();
  return response;
};
const updateAlien = async (id, sub) => {
  const alien = await getAlienById(id);
  alien.sub = sub;
  const res = await createAlien(alien);
  return res;
};
const deleteAlien = async (id) => {
  const alien = await getAlienById(id);
  const response = await alien.remove();
  return response;
};
module.exports = {
  getAliens,
  getAlienById,
  createAlien,
  updateAlien,
  deleteAlien,
};
