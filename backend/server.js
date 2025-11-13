const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: { type: String, default: 'https://via.placeholder.com/300' },
  category: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// SEED MENU (Run once)
app.get('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const items = [
      { name: "Nasi Lemak", price: 8.90, category: "Mains" },
      { name: "Teh Tarik", price: 2.50, category: "Drinks" },
      { name: "Roti Prata", price: 4.50, category: "Mains" }
    ];
    await MenuItem.insertMany(items);
    res.json({ message: "Menu seeded!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MENU
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Seed: http://localhost:${PORT}/seed`);
});