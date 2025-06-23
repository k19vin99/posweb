import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";  // Para redireccionar

export default function AddStore() {
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
    empresa_id: "",  // Aquí se asociará con el ID de la empresa
  });

  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:3001/api/stores", storeData);
      alert("Almacén creado con éxito!");
      console.log(response.data);
      navigate("/stores");  // Redirigir a la página de almacenes después de crear
    } catch (error) {
      console.error("Error al crear el almacén:", error);
      alert("Hubo un error al crear el almacén.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Nombre del Almacén</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del almacén"
            value={storeData.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <h2>Dirección</h2>
          <input
            type="text"
            name="direccion.region"
            placeholder="Región"
            value={storeData.direccion.region}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="direccion.comuna"
            placeholder="Comuna"
            value={storeData.direccion.comuna}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="direccion.poblacion_villa"
            placeholder="Población/Villa"
            value={storeData.direccion.poblacion_villa}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="direccion.calle"
            placeholder="Calle"
            value={storeData.direccion.calle}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="direccion.numero"
            placeholder="Número"
            value={storeData.direccion.numero}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <h2>Teléfono</h2>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={storeData.telefono}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <h2>Correo Electrónico</h2>
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={storeData.correo}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <h2>Empresa ID</h2>
          <input
            type="text"
            name="empresa_id"
            placeholder="ID de la empresa"
            value={storeData.empresa_id}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Guardar Almacén
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
