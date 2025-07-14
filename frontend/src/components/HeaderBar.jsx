import { useAuth } from "../context/AuthContext";

export default function HeaderBar() {
  const { role, logout } = useAuth();

  const styles = {
    navbar: {
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      height: "50px",
      backgroundColor: "#f4f4f4",
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-between",  // 🔥 Texto a la izquierda y botón a la derecha
      alignItems: "center",
      padding: "0 20px",
      fontFamily: "POS WEB, sans-serif",
    },
    title: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#000",
    },
    button: {
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.title}>Sistema de Punto de Venta e Inventario</div>
      <p>Tu rol es: {role}</p>
      <button onClick={logout} style={styles.button}>Cerrar sesión</button>
    </div>
  );
}
