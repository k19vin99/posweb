import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import LatBar from "../../components/LatBar";
import HeaderBar from "../../components/HeaderBar";
import ProfileStyles from "../../styles/ProfileStyles";
import formStyle from "../../styles/formStyles";
export default function MyProfile() {
  const [user, setUser] = useState(null);
  const { token } = useAuth(); // ✅ AQUÍ está permitido
  const userId = localStorage.getItem("userId"); // temporal hasta que se exponga en useAuth

  useEffect(() => {
    if (!userId) {
      console.warn("No hay userId en localStorage");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      }
    };

    fetchProfile();
  }, [userId, token]);

  if (!user) return <div>Cargando perfil...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeaderBar />
      <div style={{ display: 'flex' }}>
        <LatBar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', padding: '30px 0'}}>
          <div style={{ width: '100%', maxWidth: '700px', marginLeft: '0px' }}>
            <div style={formStyle.container}>
              <h2 style={ProfileStyles.title}>Mi Perfil</h2>
              <p><strong>Nombre:</strong> {user.primer_nombre} {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              <p><strong>Género:</strong> {user.genero}</p>
              <p><strong>Rol:</strong> {user.role}</p>
              <p><strong>Empresa:</strong> {user.empresa_nombre}</p>
              <p><strong>Almacén:</strong> {user.almacen_nombre}</p>
              <p><strong>Dirección:</strong> {user.region}, {user.comuna}, {user.poblacion_villa}, {user.calle}, {user.numero}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
