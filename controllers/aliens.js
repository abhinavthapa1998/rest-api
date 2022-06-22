const Alien = require("../models/aliens");
const alienService = require("../services/AlienService");

exports.get_all_aliens = async (req, res) => {
  try {
    const aliens = await alienService.getAliens();
    res.json(aliens);
  } catch (error) {
    res.send(error);
  }
};

exports.get_alien_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const aliens = await alienService.getAlienById(id);
    res.json(aliens);
  } catch (error) {
    res.send("Error");
  }
};

exports.create_alien = async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });
  try {
    const response = await alienService.createAlien(alien);
    res.json(response);
  } catch (error) {
    res.send(error);
  }
};

exports.update_alien = async (req, res) => {
  try {
    const id = req.params.id;
    const sub = req.body.sub;
    const response = await alienService.updateAlien(id, sub);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

exports.delete_alien = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await alienService.deleteAlien(id);
    res.json(response);
  } catch (error) {
    res.send(error);
  }
};
