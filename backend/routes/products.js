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

// GET productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST nuevo producto con imagen
router.post("/", upload.single("imagen"), async (req, res) => {
  const { id, nombre, marca, stock, tipo, precio } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("🟡 Datos recibidos:", { id, nombre, marca, stock, tipo, precio, imagen });  // <- Agrega esto

  try {
    const result = await pool.query(
      "INSERT INTO products (id, nombre, marca, stock, tipo, precio, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, nombre, marca, stock, tipo, precio, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al insertar producto:", err);  // <- Ya lo tienes
    res.status(500).json({ error: "Error al agregar producto" });
  }
});


module.exports = router;
