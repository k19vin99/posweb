import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
  });

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error al cargar las empresas:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Start editing a company
  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({
      nombre: company.nombre,
      direccion: company.direccion,
      telefono: company.telefono,
      correo: company.correo,
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3001/api/companies/${editingCompany.id}`, formData);
      fetchCompanies();  // Refresh company list
      setEditingCompany(null);  // Close the edit form
    } catch (error) {
      console.error("Error al actualizar la empresa:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Empresas</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Almacenes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.empresa_id}>
                <td style={styles.td}>{company.empresa_id}</td>
                <td style={styles.td}>{company.nombre_empresa}</td>
                <td style={styles.td}>
                  {company.region}, {company.comuna}, {company.poblacion_villa}, {company.calle} {company.numero}
                </td>
                <td style={styles.td}>{company.telefono}</td>
                <td style={styles.td}>{company.correo}</td>
                <td style={styles.td}>
                  {company.almacenes.length > 0 ? company.almacenes.join(", ") : "Sin almacenes"}
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(company)} style={styles.editButton}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingCompany && (
          <div style={styles.formContainer}>
            <h3>Editar Empresa</h3>
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la empresa"
                value={formData.nombre}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                style={styles.input}
              />
              <button type="button" onClick={handleSaveChanges} style={styles.saveButton}>
                Guardar Cambios
              </button>
            </form>
          </div>
        )}
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
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#FF9800",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  formContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    width: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
