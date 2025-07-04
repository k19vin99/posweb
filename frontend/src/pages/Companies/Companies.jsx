import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import commonStyles from "../../styles/commonStyles";

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
      <div style={commonStyles.container}>
        <h2 style={commonStyles.h2}>Empresas</h2>

        <table style={commonStyles.table}>
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
            {companies.map((company, index) => (
              <tr key={company.id} style={index % 2 === 0 ? commonStyles.rowWhite : commonStyles.rowGray}>
                <td style={commonStyles.td}>{company.empresa_id}</td>
                <td style={commonStyles.td}>{company.nombre_empresa}</td>
                <td style={commonStyles.td}>
                  {company.region}, {company.comuna}, {company.poblacion_villa}, {company.calle} {company.numero}
                </td>
                <td style={commonStyles.td}>{company.telefono}</td>
                <td style={commonStyles.td}>{company.correo}</td>
                <td style={commonStyles.td}>
                  {company.almacenes.length > 0 ? company.almacenes.join(", ") : "Sin almacenes"}
                </td>
                <td style={commonStyles.td}>
                  <button onClick={() => handleEdit(company)} style={commonStyles.editButton}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingCompany && (
          <div style={commonStyles.formContainer}>
            <h3 style={commonStyles.h3}>Editar Empresa</h3>
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la empresa"
                value={formData.nombre}
                onChange={handleChange}
                style={commonStyles.input}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                style={commonStyles.input}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                style={commonStyles.input}
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                style={commonStyles.input}
              />
              <button type="button" onClick={handleSaveChanges} style={commonStyles.saveButton}>
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
  
};

