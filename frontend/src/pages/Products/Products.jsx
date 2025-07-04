import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Products.css";
import commonStyles from "../../styles/commonStyles";
import { useNavigate } from "react-router-dom";


export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

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

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        fetchProductos();
      } catch (err) {
        alert("Error al eliminar producto");
      }
    }
  };

  // Ir a la página de edición
  const handleEdit = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div style={commonStyles.container}>
        <h2 style={commonStyles.h2}>Productos</h2>

        <table style={commonStyles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={p.id} style={index % 2 === 0 ? commonStyles.rowWhite : commonStyles.rowGray}>
                <td style={commonStyles.td}>{p.id}</td>
                <td style={commonStyles.td}>{p.nombre}</td>
                <td style={commonStyles.td}>{p.marca}</td>
                <td style={commonStyles.td}>{p.stock}</td>
                <td style={commonStyles.td}>{p.tipo}</td>
                <td style={commonStyles.td}>${p.precio}</td>
                <td style={commonStyles.td}>
                  <img src={`http://localhost:3001${p.imagen}`} alt={p.nombre} style={commonStyles.imgProduct} />
                </td>
                <td style={commonStyles.td}>
                  {/* Botón editar */}
                  <button
                    onClick={() => handleEdit(p.id)}
                    title="Editar"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontSize: "18px",
                    }}
                  >
                    <span role="img" aria-label="editar">✏️</span>
                  </button>
                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDelete(p.id)}
                    title="Eliminar"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    <span role="img" aria-label="eliminar">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setShowForm(!showForm)} style={commonStyles.addButton}>
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