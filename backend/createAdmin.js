// createAdmin.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./config/db");

const crearAdmin = async () => {
  const email = "admin@allcom.cl";
  const passwordPlano = "Allcom2025";
  const role = "supervisor";

  const hashed = await bcrypt.hash(passwordPlano, 10);

  try {
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [email, hashed, role]
    );
    console.log("✅ Usuario admin creado correctamente.");
  } catch (err) {
    console.error("❌ Error al crear admin:", err.message);
  } finally {
    pool.end(); // cerrar conexión
  }
};

crearAdmin();
