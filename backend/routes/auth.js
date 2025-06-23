const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findByEmail } = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashed, role });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al registrar" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ error: "Correo no registrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;
