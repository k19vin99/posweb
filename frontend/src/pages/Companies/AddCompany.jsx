import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import formStyle from "../../styles/formStyles";

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

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/companies", companyData);
      alert("Empresa creada con éxito!");
      console.log(response.data);
      navigate("/companies");
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      alert("Hubo un error al crear la empresa.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={formStyle.container}>
        <form onSubmit={handleSubmit} style={formStyle.form}>
          <h2 style={formStyle.title}>Nombre de la Empresa</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la empresa"
            value={companyData.nombre}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Dirección</h3>
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={companyData.direccion.region}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="comuna"
            placeholder="Comuna"
            value={companyData.direccion.comuna}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="poblacion_villa"
            placeholder="Población/Villa"
            value={companyData.direccion.poblacion_villa}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            value={companyData.direccion.calle}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={companyData.direccion.numero}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Teléfono</h3>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={companyData.telefono}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Correo Electrónico</h3>
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={companyData.correo}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <button
            type="submit"
            style={
              isHovered
                ? { ...formStyle.button, backgroundColor: "#fff", color: "#000", border: "2px solid #000" }
                : formStyle.button
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Guardar Empresa
          </button>
        </form>
      </div>
    </div>
  );
}