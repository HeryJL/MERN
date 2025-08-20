require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const fimRoutes = require('./routes/filmsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/users" ,userRoutes );
app.use("/api/films" , fimRoutes);

app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/images", express.static(path.join(__dirname, "images")));

// conexion mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("BDD ok"))

app.listen(5000);