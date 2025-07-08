const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET productos (con opción de filtrar por store_id)
router.get("/", async (req, res) => {
  const { store_id } = req.query;
  try {
    const result = await pool.query(
      `
      SELECT 
        p.*, 
        s.nombre AS almacen_nombre
      FROM products p
      LEFT JOIN store s ON p.store_id = s.id
      ${store_id ? "WHERE p.store_id = $1" : ""}
      ORDER BY p.id ASC
      `,
      store_id ? [store_id] : []
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST nuevo producto con imagen
router.post("/", upload.single("imagen"), async (req, res) => {
  const { id, nombre, marca, stock, tipo, precio, store_id } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Validar imagen
    if (!imagen) {
      return res.status(400).json({ error: "Debes seleccionar una imagen" });
    }

    // Validar si el ID ya existe
    const existing = await pool.query("SELECT 1 FROM products WHERE id = $1", [id]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Código ya existe" });
    }

    // Insertar producto
    await pool.query(
      `INSERT INTO products (id, nombre, marca, stock, tipo, precio, imagen, store_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, nombre, marca, stock, tipo, precio, imagen, store_id || null]
    );

    res.status(201).json({ message: "Producto creado correctamente" });
  } catch (err) {
    console.error("❌ Error al crear producto:", err);
    res.status(500).json({ error: "Error interno al crear producto" });
  }
});


// GET producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al obtener producto:", err);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

// DELETE producto por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente", producto: result.rows[0] });
  } catch (err) {
    console.error("❌ Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;
