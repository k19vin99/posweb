import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LatBar from "../../components/LatBar";
import HeaderBar from "../../components/HeaderBar";
import formStyles from "../../styles/formStyles";

export default function AddProduct() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  // Cargar almacenes al montar el componente
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/stores");
        setStores(res.data);
      } catch (err) {
        console.error("Error al cargar almacenes", err);
      }
    };

    fetchStores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("Debes seleccionar una imagen");
    return;
  }

  const data = new FormData();
  Object.entries(formData).forEach(([key, val]) => data.append(key, val));
  data.append("imagen", file);

  try {
    const res = await axios.post("http://localhost:3001/api/products", data);
    alert(res.data.message);
    navigate("/products");
  } catch (err) {
    const errorMsg = err.response?.data?.error || "Error al agregar el producto";
    alert(errorMsg);
  }
};



  return (

    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeaderBar />
    <div style={{ display: 'flex' }}>
      <LatBar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', padding: '30px 0'}}>
        <div style={{ width: '100%', maxWidth: '700px', marginLeft: '0px' }}>
            <div style={formStyles.container}>
              <form onSubmit={handleSubmit} style={formStyles.form}>
              <h3 style={formStyles.subtitle}>Código del Producto</h3>
              <input type="number" name="id" placeholder="Código" required onChange={handleChange} style={formStyles.input} />
              <h3 style={formStyles.subtitle}>Nombre</h3>
              <input type="text" name="nombre" placeholder="Nombre" required onChange={handleChange} style={formStyles.input}/>
              <h3 style={formStyles.subtitle}>Marca</h3>
              <input type="text" name="marca" placeholder="Marca" required onChange={handleChange} style={formStyles.input}/>
              <input type="number" name="stock" placeholder="Stock" required onChange={handleChange} style={formStyles.input}/>
              <input type="number" name="precio" placeholder="Precio" required onChange={handleChange} style={formStyles.input}/>
              
              <select name="tipo" required onChange={handleChange}>
                <option value="">Tipo</option>
                <option value="unitario">Unitario</option>
                <option value="pesable">Pesable</option>
              </select>

              <select
                name="store_id"
                required
                onChange={handleChange}
                value={formData.store_id || ""}
                style={formStyles.input}
              >
                <option value="">Selecciona un almacén</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.nombre}
                  </option>
                ))}
              </select>

              <label className="file-label">
                Seleccionar imagen
                <input type="file" name="imagen" onChange={handleFileChange} style={formStyles.input} />

              </label>
              {file && <span className="file-name">Imagen seleccionada</span>}

              <button type="submit" style={formStyles.button}>Guardar Producto</button>
            </form>
            </div>
            </div>
      </div>
    </div>
  </div>
  );
}
