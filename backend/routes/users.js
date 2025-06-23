// backend/routes/users.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, email, role FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

module.exports = router;
