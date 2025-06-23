import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });
      login(res.data.token, "supervisor"); // Por ahora el rol es fijo
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    fontFamily: "Uber Move, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: 16,
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
