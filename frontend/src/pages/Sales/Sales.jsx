import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/products");
        const availableProducts = res.data.filter((p) => p.stock > 0);
        setProducts(availableProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.precio ?? 0) * (item.quantity ?? 0),
    0
  );

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    gap: "20px",
    flexWrap: "wrap",
  };

  const boxStyle = {
    flex: "1 1 300px",
    maxWidth: "400px",
    border: "2px solid black",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    backgroundColor: "white",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const listStyle = {
    overflowY: "auto",
    textAlign: "left",
    paddingRight: "10px",
    flex: 1,
  };

  const itemStyle = {
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  };

  const buttonStyle = {
    marginTop: "5px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  return (
      
    <div style={containerStyle}>
      {/* Menú */}
      <Navbar />
      <div style={boxStyle}>
        <h1 style={titleStyle}>Menú</h1>
      </div>

      {/* Carrito */}
      <div style={boxStyle}>
        <h1 style={titleStyle}>Carrito de Compras</h1>
        <div style={listStyle}>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={itemStyle}>
                <strong>{item.nombre}</strong>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                  Cantidad: {item.quantity}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                  Subtotal: ${ (item.precio * item.quantity).toLocaleString() }
                </p>
                <button
                  style={removeButtonStyle}
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <h3 style={{ marginTop: "10px" }}>
            Total: ${ total.toLocaleString() }
          </h3>
        )}
      </div>

      {/* Productos Disponibles */}
      <div style={boxStyle}>
        <h1 style={titleStyle}>Productos Disponibles</h1>
        <div style={listStyle}>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} style={itemStyle}>
                <strong>{product.nombre}</strong>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                  {product.descripcion}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                  Stock: {product.stock} | Precio: ${product.precio?.toLocaleString()}
                </p>
                <button
                  style={buttonStyle}
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
