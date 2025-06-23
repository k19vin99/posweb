import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Products from "../pages/products";
import Users from "../pages/Users";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Productos</Link>
        <Link to="/users" style={styles.link}>Usuarios</Link>
      </div>
      <div style={styles.right}>
        <button onClick={logout} style={styles.logoutButton}>Cerrar Sesión</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ddd",
    fontFamily: "Uber Move, sans-serif",
  },
  left: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  right: {},
  logoutButton: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
  },
};
