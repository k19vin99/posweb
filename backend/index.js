const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Importaciones
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users"); // <-- asegúrate de que esté bien escrito
const storesRoutes = require("./routes/stores");
const companiesRoutes = require("./routes/companies");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/stores", storesRoutes);
app.use("/api/companies", companiesRoutes);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // <-- esta línea debe estar
app.use("/api/users", userRoutes); // <-- esta línea debe estar

// Inicio del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend en puerto ${PORT}`);
});
