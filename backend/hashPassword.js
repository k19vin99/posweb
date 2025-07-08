// hashPassword.js

const bcrypt = require("bcrypt");

// Cambia esta línea con la contraseña que quieras hashear
const plainPassword = "Allcom2025";

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    console.log("\n✅ Contraseña original:");
    console.log(password);
    console.log("\n🔒 Contraseña hasheada (para insertar en la base de datos):");
    console.log(hashed);
    console.log("\nCopia este hash y úsalo en tu INSERT SQL o en la creación del usuario.");
  } catch (error) {
    console.error("❌ Error al hashear la contraseña:", error);
  }
}

hashPassword(plainPassword);
