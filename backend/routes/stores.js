// backend/routes/stores.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Crear un nuevo almacén con dirección
router.post("/", async (req, res) => {
  const { nombre, direccion, telefono, correo, empresa_id } = req.body;

  try {
    // Insertar dirección
    const addressResult = await pool.query(
      "INSERT INTO address (region, comuna, poblacion_villa, calle, numero) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [direccion.region, direccion.comuna, direccion.poblacion_villa, direccion.calle, direccion.numero]
    );

    const direccionId = addressResult.rows[0].id;

    // Insertar almacén
    const storeResult = await pool.query(
      "INSERT INTO store (nombre, direccion_id, telefono, correo, empresa_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [nombre, direccionId, telefono, correo, empresa_id]
    );

    // Insertar en tabla puente company_store
    await pool.query(
      "INSERT INTO company_store (company_id, store_id) VALUES ($1, $2)",
      [empresa_id, storeResult.rows[0].id]
    );

    res.status(201).json({
      message: "Almacén creado con éxito",
      storeId: storeResult.rows[0].id,
    });
  } catch (err) {
    console.error("❌ Error al crear el almacén:", err);
    res.status(500).json({ error: "Error al crear el almacén." });
  }
});

// Obtener todos los almacenes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.nombre, s.telefono, s.correo, s.empresa_id, 
              a.region, a.comuna, a.poblacion_villa, a.calle, a.numero,
              e.nombre AS empresa_nombre
         FROM store s
         JOIN address a ON s.direccion_id = a.id
         JOIN company e ON s.empresa_id = e.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener almacenes:", err);
    res.status(500).json({ error: "Error al obtener almacenes." });
  }
});
// GET /api/stores/by-company/:companyId
router.get("/by-company/:companyId", async (req, res) => {
  const { companyId } = req.params;
  try {
    const result = await pool.query(
      `SELECT s.id, s.nombre 
       FROM store s
       INNER JOIN company_store cs ON cs.store_id = s.id
       WHERE cs.company_id = $1`,
      [companyId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener almacenes por empresa:", error);
    res.status(500).json({ error: "Error al obtener almacenes por empresa" });
  }
});

module.exports = router;
