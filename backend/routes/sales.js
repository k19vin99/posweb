
router.post("/sales", async (req, res) => {
  const { cart, total } = req.body;
  try {
    // 1. Insertar en la tabla sales
    const saleResult = await pool.query(
      "INSERT INTO sales (fecha, total) VALUES (NOW(), $1) RETURNING id",
      [total]
    );
    const saleId = saleResult.rows[0].id;

    // 2. Insertar detalle de productos vendidos
    for (const item of cart) {
      await pool.query(
        "INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [saleId, item.id, item.quantity, item.precio]
      );

      // 3. Actualizar stock
      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.id]
      );
    }

    res.json({ message: "Venta registrada con éxito", saleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la venta" });
  }
});
