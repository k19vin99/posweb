import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Usuarios</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>{u.id}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "POS WEB, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    padding: "12px",
    fontWeight: "bold",
  },
  td: {
    textAlign: "center",
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};
