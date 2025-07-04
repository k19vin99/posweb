import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import formStyle from "../../styles/formStyles";

export default function AddStore() {
  const [isHovered, setIsHovered] = useState(false);
  const [storeData, setStoreData] = useState({
    nombre: "",
    direccion: {
      region: "",
      comuna: "",
      poblacion_villa: "",
      calle: "",
      numero: "",
    },
    telefono: "",
    correo: "",
    empresa_id: "",
  });

  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/companies")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al cargar empresas:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in storeData.direccion) {
      setStoreData({
        ...storeData,
        direccion: { ...storeData.direccion, [name]: value },
      });
    } else {
      setStoreData({ ...storeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/stores", storeData);
      alert("Almacén creado con éxito!");
      navigate("/stores");
    } catch (error) {
      console.error("Error al crear el almacén:", error);
      alert("Hubo un error al crear el almacén.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={formStyle.container}>
        <form onSubmit={handleSubmit} style={formStyle.form}>
          <h2 style={formStyle.title}>Nombre del Almacén</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del almacén"
            value={storeData.nombre}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Dirección</h3>
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={storeData.direccion.region}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="comuna"
            placeholder="Comuna"
            value={storeData.direccion.comuna}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="poblacion_villa"
            placeholder="Población/Villa"
            value={storeData.direccion.poblacion_villa}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            value={storeData.direccion.calle}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={storeData.direccion.numero}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Teléfono</h3>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={storeData.telefono}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Correo Electrónico</h3>
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={storeData.correo}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Empresa</h3>
          <select
            name="empresa_id"
            value={storeData.empresa_id}
            onChange={handleChange}
            required
            style={formStyle.input}
          >
            <option value="">Selecciona una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nombre}
              </option>
            ))}
          </select>
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
            Guardar Almacén
          </button>
        </form>
      </div>
    </div>
  );
}