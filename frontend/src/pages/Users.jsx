import Navbar from "../components/Navbar";

export default function Users() {
  const usuarios = [
    { id: 1, email: "admin@allcom.cl", rol: "supervisor" },
    { id: 2, email: "cajero1@allcom.cl", rol: "cajero" },
  ];

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Usuarios</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
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
    fontFamily: "Uber Move, sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    textAlign: "left",
    padding: "10px",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "10px",
  },
};
