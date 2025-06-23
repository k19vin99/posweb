import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Products.css"; // <-- Asegúrate de que este path sea correcto

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [productos, setProductos] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (file) data.append("imagen", file);

    try {
      await axios.post("http://localhost:3001/api/products", data);
      setShowForm(false);
      setFormData({});
      setFile(null);
      fetchProductos();
    } catch (err) {
      console.error("Error al enviar:", err);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos", err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 className="titulo-productos">Productos</h2>


        <table style={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={p.id} style={index % 2 === 0 ? styles.rowWhite : styles.rowGray}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.nombre}</td>
                <td style={styles.td}>{p.marca}</td>
                <td style={styles.td}>{p.stock}</td>
                <td style={styles.td}>{p.tipo}</td>
                <td style={styles.td}>${p.precio}</td>
                <td style={styles.td}>
                  <img src={`http://localhost:3001${p.imagen}`} alt={p.nombre} style={styles.img} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
            {showForm ? "Cancelar" : "Añadir Producto"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="form-producto">
              <input type="number" name="id" placeholder="Código" required onChange={handleChange} />
              <input type="text" name="nombre" placeholder="Nombre" required onChange={handleChange} />
              <input type="text" name="marca" placeholder="Marca" required onChange={handleChange} />
              <input type="number" name="stock" placeholder="Stock" required onChange={handleChange} />
              <input type="number" name="precio" placeholder="Precio" required onChange={handleChange} />
              <select name="tipo" required onChange={handleChange}>
                <option value="">Tipo</option>
                <option value="unitario">Unitario</option>
                <option value="pesable">Pesable</option>
              </select>

              <label className="file-label">
                Seleccionar imagen
                <input type="file" name="imagen" required onChange={handleFileChange} className="file-input" />
                </label>
                {file && <span className="file-name">Imagen seleccionada</span>}


              <button type="submit" className="save-button">Guardar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "POS WEB",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  td: {
    textAlign: "center",
    padding: "12px",
  },
  rowWhite: {
    backgroundColor: "#ffffff",
  },
  rowGray: {
    backgroundColor: "#f9f9f9",
  },
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  addButton: {
    marginTop: 20,
    padding: "12px 20px",
    fontSize: 16,
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
