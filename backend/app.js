const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const ClothingItem = require('./models/clothingitem');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to the database");
})
.catch((e) => {
  console.error("Database connection error:", e);
  process.exit(1);
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  console.error("Error details:", err);
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
}).on('error', (err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});

const insertDefaultClothingItems = async () => {
  try {
    for (const item of defaultClothingItems) {
      const existingItem = await ClothingItem.findOne({ name: item.name });
      if (!existingItem) {
        await ClothingItem.create(item);
      }
    }
  } catch (error) {
    console.error('Error inserting default clothing items:', error);
  }
};
