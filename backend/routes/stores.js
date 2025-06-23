// backend/routes/stores.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Crear un nuevo almacén con dirección
router.post("/", async (req, res) => {
  const { nombre, direccion, telefono, correo, empresa_id } = req.body;

  try {
    // Insertar dirección si no existe
    const addressResult = await pool.query(
      "INSERT INTO address (region, comuna, poblacion_villa, calle, numero) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [direccion.region, direccion.comuna, direccion.poblacion_villa, direccion.calle, direccion.numero]
    );
    
    const direccionId = addressResult.rows[0].id;

    // Insertar almacén
    const result = await pool.query(
      "INSERT INTO store (nombre, direccion_id, telefono, correo, empresa_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [nombre, direccionId, telefono, correo, empresa_id]
    );

    res.status(201).json({
      message: "Almacén creado con éxito",
      storeId: result.rows[0].id,
    });
  } catch (err) {
    console.error("❌ Error al crear el almacén:", err);
    res.status(500).json({ error: "Error al crear el almacén." });
  }
});

module.exports = router;
