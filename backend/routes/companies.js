const express = require("express"); // Asegúrate de importar express
const router = express.Router(); // Aquí se inicializa el router
const pool = require("../config/db");

// Obtener todas las empresas
// Obtener todas las empresas con la dirección
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        company.id AS empresa_id,
        company.nombre AS nombre_empresa,
        address.region,
        address.comuna,
        address.poblacion_villa,
        address.calle,
        address.numero,
        company.telefono,
        company.correo,
        ARRAY_AGG(store.nombre) AS almacenes
      FROM company
      INNER JOIN address ON company.direccion_id = address.id
      LEFT JOIN company_store ON company.id = company_store.company_id
      LEFT JOIN store ON company_store.store_id = store.id
      GROUP BY company.id, address.id
    `);

    res.json(result.rows); // Retornar todas las empresas con sus direcciones y almacenes
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las empresas." });
  }
});



// Crear una nueva empresa
// Crear una nueva empresa con almacenes
router.post("/", async (req, res) => {
  const { nombre, direccion, telefono, correo, almacenes } = req.body;

  try {
    // Insertar dirección
    const addressResult = await pool.query(
      "INSERT INTO address (region, comuna, poblacion_villa, calle, numero) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [direccion.region, direccion.comuna, direccion.poblacion_villa, direccion.calle, direccion.numero]
    );
    const direccionId = addressResult.rows[0].id;

    // Insertar empresa
    const companyResult = await pool.query(
      "INSERT INTO company (nombre, direccion_id, telefono, correo) VALUES ($1, $2, $3, $4) RETURNING id",
      [nombre, direccionId, telefono, correo]
    );
    const empresaId = companyResult.rows[0].id;

    // Asignar almacenes a la empresa
    if (almacenes && almacenes.length > 0) {
      const values = almacenes.map(storeId => `(${empresaId}, ${storeId})`).join(", ");
      await pool.query(`INSERT INTO company_store (company_id, store_id) VALUES ${values}`);
    }

    res.status(201).json({ message: "Empresa creada correctamente", empresaId, direccionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar la empresa." });
  }
});
// Actualizar empresa y asignar almacenes
// Actualizar empresa y asignar almacenes
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, correo, almacenes } = req.body;

  try {
    // Actualizar la información de la empresa
    await pool.query(
      "UPDATE company SET nombre = $1, direccion = $2, telefono = $3, correo = $4 WHERE id = $5",
      [nombre, direccion, telefono, correo, id]
    );

    // Borrar las asignaciones de almacenes actuales
    await pool.query("DELETE FROM company_store WHERE company_id = $1", [id]);

    // Asignar los nuevos almacenes a la empresa
    if (almacenes && almacenes.length > 0) {
      const values = almacenes.map(storeId => `(${id}, ${storeId})`).join(", ");
      await pool.query(`INSERT INTO company_store (company_id, store_id) VALUES ${values}`);
    }

    res.status(200).json({ message: "Empresa actualizada correctamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la empresa." });
  }
});

module.exports = router; // No olvides exportar el router
