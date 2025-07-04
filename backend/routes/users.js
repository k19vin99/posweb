const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        u.*, 
        a.region, a.comuna, a.poblacion_villa, a.calle, a.numero
      FROM users u
      LEFT JOIN address a ON u.direccion_id::text = a.id::text`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        u.*, 
        a.region, a.comuna, a.poblacion_villa, a.calle, a.numero
      FROM users u
      LEFT JOIN address a ON u.direccion_id = a.id
      WHERE u.id::text = $1`,
      [String(id)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  const {
    id,
    username,
    password,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    genero,
    correo,
    direccion,
    role
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Insertar dirección en la tabla address
    const addressResult = await pool.query(
      `INSERT INTO address (region, comuna, poblacion_villa, calle, numero)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        direccion.region,
        direccion.comuna,
        direccion.poblacion_villa,
        direccion.calle,
        direccion.numero
      ]
    );
    const direccionId = addressResult.rows[0].id;

    // 2. Insertar usuario en la tabla users
    await pool.query(
      `INSERT INTO users 
      (id, username, password, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, genero, email, direccion_id, role)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        id,
        username,
        hashedPassword,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        correo,
        direccionId,
        role
      ]
    );

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;