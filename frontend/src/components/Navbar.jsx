import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Cambiar la visibilidad al hacer hover y al hacer clic
  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);
  const handleClick = () => setDropdownVisible(!dropdownVisible);

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Productos</Link>
        <Link to="/companies" style={styles.link}>Empresas</Link>
        <Link to="/add-company" style={styles.link}>Agregar Empresa</Link>
        <Link to="/add-store" style={styles.link}>Nuevo Almacén</Link>

        <div 
          style={styles.storeMenu}
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/stores" style={styles.link} onClick={handleClick}>
            Almacénes
            <span style={styles.arrow}>{dropdownVisible ? "▲" : "▼"}</span> {/* Flecha hacia abajo */}
          </Link>

          {/* Mostrar el submenú cuando el ratón pasa o cuando se hace clic */}
          {dropdownVisible && (
            <div style={styles.dropdown}>
              <Link to="/stores/new" style={styles.dropdownLink}>Nuevo Almacén</Link>
              <Link to="/stores" style={styles.dropdownLink}>Almacénes</Link>
            </div>
          )}
        </div>

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
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    marginLeft: 5,
    fontSize: 14,
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
  storeMenu: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 100,
  },
  dropdownLink: {
    textDecoration: "none",
    color: "#000",
    display: "block",
    padding: "8px 16px",
    fontSize: 16,
    fontWeight: "normal",
  },
};
