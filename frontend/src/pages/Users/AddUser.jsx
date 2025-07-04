import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import formStyle from "../../styles/formStyles";

export default function AddUser() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    genero: "",
    correo: "",
    role: "",
    direccion: {
      region: "",
      comuna: "",
      poblacion_villa: "",
      calle: "",
      numero: "",
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in user.direccion) {
      setUser({
        ...user,
        direccion: { ...user.direccion, [name]: value },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users", user);
      alert("Usuario creado con éxito");
      navigate("/users");
    } catch (error) {
      alert("Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={formStyle.container}>
        <h2 style={formStyle.title}>Crear Usuario</h2>
        <form
          onSubmit={handleSubmit}
          style={formStyle.form}
        >
          <input
            type="text"
            name="id"
            placeholder="RUT"
            value={user.id}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={user.password}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="primer_nombre"
            placeholder="Primer Nombre"
            value={user.primer_nombre}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="segundo_nombre"
            placeholder="Segundo Nombre"
            value={user.segundo_nombre}
            onChange={handleChange}
            style={formStyle.input}
          />
          <input
            type="text"
            name="primer_apellido"
            placeholder="Primer Apellido"
            value={user.primer_apellido}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="segundo_apellido"
            placeholder="Segundo Apellido"
            value={user.segundo_apellido}
            onChange={handleChange}
            style={formStyle.input}
          />
          <select
            name="genero"
            value={user.genero}
            onChange={handleChange}
            required
            style={formStyle.input}
          >
            <option value="">Selecciona género</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
          </select>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            style={formStyle.input}
          >
            <option value="">Selecciona rol</option>
            <option value="supervisor">Supervisor</option>
            <option value="cajero">Cajero</option>
          </select>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={user.correo}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <h3 style={formStyle.subtitle}>Dirección</h3>
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={user.direccion.region}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="comuna"
            placeholder="Comuna"
            value={user.direccion.comuna}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="poblacion_villa"
            placeholder="Población/Villa"
            value={user.direccion.poblacion_villa}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            value={user.direccion.calle}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={user.direccion.numero}
            onChange={handleChange}
            required
            style={formStyle.input}
          />
          <button type="submit" style={isHovered ? { ...formStyle.button, ...formStyle.buttonHover } : formStyle.button}
          onMouseEnter={() => setIsHovered(true)
            
          }
          onMouseLeave={() => setIsHovered(false) }
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}