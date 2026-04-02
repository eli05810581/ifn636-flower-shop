const Flower = require('../models/Flower');

// GET all flowers
const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 });
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flowers' });
  }
};

// CREATE flower
const addFlower = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newFlower = new Flower({
      name,
      description,
      price,
      category,
    });

    const savedFlower = await newFlower.save();
    res.status(201).json(savedFlower);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create flower' });
  }
};

// UPDATE flower
const updateFlower = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const updatedFlower = await Flower.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
      { new: true }
    );

    res.json(updatedFlower);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flower' });
  }
};

// DELETE flower
const deleteFlower = async (req, res) => {
  try {
    await Flower.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flower' });
  }
};

module.exports = {
  getFlowers,
  addFlower,
  updateFlower,
  deleteFlower,
};