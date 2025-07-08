const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        u.id, u.username, u.email AS correo, u.role, 
        u.primer_nombre, u.segundo_nombre,
        u.primer_apellido, u.segundo_apellido,
        u.genero,
        a.region, a.comuna, a.poblacion_villa, a.calle, a.numero,
        c.nombre AS empresa,
        s.nombre AS almacen
      FROM users u
      LEFT JOIN address a ON u.direccion_id::integer = a.id
      LEFT JOIN company c ON u.company_id::integer = c.id
      LEFT JOIN store s ON u.store_id::integer = s.id
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // ✅ opción 2: forzar a integer
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const result = await pool.query(
      `SELECT 
          u.*, 
          u.email AS correo,
          a.region, a.comuna, a.poblacion_villa, a.calle, a.numero,
          c.nombre AS empresa_nombre,
          s.nombre AS almacen_nombre
        FROM users u
        LEFT JOIN address a ON u.direccion_id::integer = a.id
        LEFT JOIN company c ON u.company_id = c.id
        LEFT JOIN store s ON u.store_id = s.id
        WHERE u.id = $1`,
      [id]
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
    role,
    company_id,
    store_id
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const direccionGoogle = `${direccion.calle} ${direccion.numero}, ${direccion.poblacion_villa}, ${direccion.comuna}, ${direccion.region}`;

    const addressResult = await pool.query(
      `INSERT INTO address (region, comuna, poblacion_villa, calle, numero, direccion_google)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        direccion.region,
        direccion.comuna,
        direccion.poblacion_villa,
        direccion.calle,
        direccion.numero,
        direccionGoogle
      ]
    );
    const direccionId = addressResult.rows[0].id;

    await pool.query(
      `INSERT INTO users 
      (id, username, password, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, genero, email, direccion_id, role, company_id, store_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
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
        role,
        company_id || null,
        store_id || null
      ]
    );

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // ✅ opción 2 aquí también
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const result = await pool.query("SELECT direccion_id FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const direccionId = result.rows[0].direccion_id;

    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    await pool.query("DELETE FROM address WHERE id = $1", [direccionId]);

    res.status(200).json({ message: "Usuario eliminado correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario." });
  }
});

module.exports = router;
