const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
