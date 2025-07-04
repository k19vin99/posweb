import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import commonStyles from "../styles/commonStyles";



export default function Home() {
  const { role, logout } = useAuth();

  return (
    
    <div>
        <Navbar />
        <h2 style={commonStyles.h2}>Bienvenido al sistema</h2>
        <p>Tu rol: {role}</p>
        <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
