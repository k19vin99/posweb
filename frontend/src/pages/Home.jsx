import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const { role, logout } = useAuth();

  return (
    
    <div>
        <Navbar />
        <h1>Bienvenido al sistema</h1>
        <p>Tu rol: {role}</p>
        <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
