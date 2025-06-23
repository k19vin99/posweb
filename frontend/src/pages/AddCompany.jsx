import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";  // Para redireccionar

export default function AddCompany() {
  const [companyData, setCompanyData] = useState({
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
  });

  const [isHovered, setIsHovered] = useState(false);  // Estado para el hover
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in companyData.direccion) {
      setCompanyData({
        ...companyData,
        direccion: { ...companyData.direccion, [name]: value },
      });
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  // Handle submit form to create company
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/companies", companyData);
      alert("Empresa creada con éxito!");
      console.log(response.data);
      navigate("/companies"); // Redirigir a la página de empresas después de crear
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      alert("Hubo un error al crear la empresa.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Nombre de la Empresa</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la empresa"
              value={companyData.nombre}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <h2>Dirección</h2>
            <input
              type="text"
              name="region"
              placeholder="Región"
              value={companyData.direccion.region}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="comuna"
              placeholder="Comuna"
              value={companyData.direccion.comuna}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="poblacion_villa"
              placeholder="Población/Villa"
              value={companyData.direccion.poblacion_villa}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="calle"
              placeholder="Calle"
              value={companyData.direccion.calle}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="numero"
              placeholder="Número"
              value={companyData.direccion.numero}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <h2>Télefono</h2>
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={companyData.telefono}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <h2>Correo Electrónico</h2>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={companyData.correo}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button
              type="submit"
              style={isHovered ? { ...styles.submitButton, ...styles.submitButtonHover } : styles.submitButton}
              onMouseEnter={() => setIsHovered(true)}  // Activar el hover
              onMouseLeave={() => setIsHovered(false)}  // Desactivar el hover
            >
              Guardar Empresa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "POS WEB, sans-serif",
    height: "100vh",  // Altura completa de la ventana para centrar verticalmente
    display: "flex",
    justifyContent: "center",  // Centrado horizontal
    alignItems: "center",  // Centrado vertical
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",  // Sombra alrededor del contenedor del formulario
    borderRadius: "8px",
    padding: "30px",
    backgroundColor: "#fff",
    maxWidth: "500px",  // Limitar el tamaño del formulario
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#000",  // Fondo negro
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",  // Suaviza la transición al hacer hover
  },
  submitButtonHover: {
    backgroundColor: "#fff",  // Fondo blanco al hacer hover
    color: "#000",  // Texto negro al hacer hover
    border: "2px solid #000",  // Borde negro al hacer hover
  },
};
