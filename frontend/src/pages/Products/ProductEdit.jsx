import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import formStyle from "../../styles/formStyles";

export default function ProductEdit() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        setProducto(res.data);
        setFormData({
          nombre: res.data.nombre,
          marca: res.data.marca,
          stock: res.data.stock,
          tipo: res.data.tipo,
          precio: res.data.precio,
        });
      })
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!producto) return <div>Cargando...</div>;

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
      await axios.put(`http://localhost:3001/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Producto actualizado con éxito");
      navigate("/products");
    } catch (err) {
      alert("Error al actualizar producto");
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={formStyle.container}>
        <h2 style={formStyle.title}>Editar Producto</h2>
        <form onSubmit={handleSubmit} style={formStyle.form}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              required
              style={formStyle.input}
            />
          </label>
          <label>
            Marca:
            <input
              type="text"
              name="marca"
              value={formData.marca || ""}
              onChange={handleChange}
              required
              style={formStyle.input}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
              required
              style={formStyle.input}
            />
          </label>
          <label>
            Tipo:
            <select
              name="tipo"
              value={formData.tipo || ""}
              onChange={handleChange}
              required
              style={formStyle.input}
            >
              <option value="">Selecciona tipo</option>
              <option value="unitario">Unitario</option>
              <option value="pesable">Pesable</option>
            </select>
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={formData.precio || ""}
              onChange={handleChange}
              required
              style={formStyle.input}
            />
          </label>
          <label>
            Imagen actual:
            <br />
            <img
              src={`http://localhost:3001${producto.imagen}`}
              alt={producto.nombre}
              style={{ width: 120, margin: "10px 0", borderRadius: 8 }}
            />
          </label>
          <label>
            Cambiar imagen:
            <input
              type="file"
              name="imagen"
              onChange={handleFileChange}
              style={formStyle.input}
            />
          </label>
          <button
            type="submit"
            style={
              isHovered
                ? { ...formStyle.button, ...formStyle.buttonHover }
                : formStyle.button
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}