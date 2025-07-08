import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import commonStyles from "../../styles/commonStyles";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

  try {
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

  return (
    <div>
      <Navbar />
      <div style={commonStyles.container}>
        <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>Usuarios</h2>
        <table style={commonStyles.table}>
          <thead>
            <tr>
              <th style={commonStyles.td}>RUT</th>
              <th style={commonStyles.td}>Username</th>
              <th style={commonStyles.td}>Nombre Completo</th>
              <th style={commonStyles.td}>Género</th>
              <th style={commonStyles.td}>Correo</th>
              <th style={commonStyles.td}>Tipo de Usuario</th>
              <th style={commonStyles.td}>Dirección</th>
              <th style={commonStyles.td}>Acciones</th>
              <th style={commonStyles.td}>Empresa</th>
              <th style={commonStyles.td}>Almacén</th>

            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, index) => (
              <tr key={u.id} style={index % 2 === 0 ? commonStyles.rowWhite : commonStyles.rowGray}>
                <td style={commonStyles.td}>{u.id}</td>
                <td style={commonStyles.td}>{u.username}</td>
                <td style={commonStyles.td}>{u.primer_nombre} {u.segundo_nombre} {u.primer_apellido} {u.segundo_apellido}</td>
                <td style={commonStyles.td}>{u.genero}</td>
                <td style={commonStyles.td}>{u.correo}</td>
                <td style={commonStyles.td}>{u.role}</td>
                <td style={commonStyles.td}>
                  {u.region}, {u.comuna}, {u.poblacion_villa}, {u.calle} {u.numero}
                </td>
                <td style={commonStyles.td}>
                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{ ...commonStyles.deleteButton, marginLeft: "5px" }}
                  >
                    Eliminar
                  </button>
                </td>
                <td style={commonStyles.td}>{u.empresa || "Sin empresa"}</td>
                <td style={commonStyles.td}>{u.almacen || "Sin almacén"}</td>



              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}