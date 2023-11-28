const express = require('mongoose');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('.routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT= process.env.PORT || 8080;

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
  .then(() => {
    console.log("Connected to Database");
    app.use('/', userRoutes);

    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("Error: " + err);
  });