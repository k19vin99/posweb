import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formStyle from "../../styles/formStyles";
import LatBar from "../../components/LatBar";
import HeaderBar from "../../components/HeaderBar";
import regionesYcomunas from "../../../utils/regionesYcomunas.json";

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
    company_id: "",
    store_id: "",
    direccion: {
      region: "",
      comuna: "",
      poblacion_villa: "",
      calle: "",
      numero: "",
    },
  });

  const [companies, setCompanies] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get("http://localhost:3001/api/companies");
      setCompanies(res.data);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchStoresByCompany = async () => {
      if (!user.company_id) {
        setFilteredStores([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3001/api/stores/by-company/${user.company_id}`);
        setFilteredStores(res.data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };
    fetchStoresByCompany();
  }, [user.company_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "region") {
      const regionSeleccionada = regionesYcomunas.find((r) => r.region === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setUser({
        ...user,
        direccion: { ...user.direccion, region: value, comuna: "" },
      });
    } else if (name === "comuna") {
      setUser({
        ...user,
        direccion: { ...user.direccion, comuna: value },
      });
    } else if (name in user.direccion) {
      setUser({
        ...user,
        direccion: { ...user.direccion, [name]: value },
      });
    } else if (name === "company_id" || name === "store_id") {
      setUser({ ...user, [name]: parseInt(value) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeaderBar />
      <div style={{ display: 'flex' }}>
        <LatBar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', padding: '30px 0' }}>
          <div style={{ width: '100%', maxWidth: '700px', marginLeft: '0px' }}>
            <div style={formStyle.container}>
              <form onSubmit={handleSubmit} style={formStyle.form}>
                <h1 style={formStyle.title}>Formulario de Registro de Usuarios</h1>

                <h2 style={formStyle.subtitle}>RUT</h2>
                <input type="text" name="id" placeholder="RUT" value={user.id} onChange={handleChange} required style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Nombre de Usuario</h2>
                <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Primer Nombre</h2>
                <input type="text" name="primer_nombre" placeholder="Primer Nombre" value={user.primer_nombre} onChange={handleChange} required style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Segundo Nombre</h2>
                <input type="text" name="segundo_nombre" placeholder="Segundo Nombre" value={user.segundo_nombre} onChange={handleChange} style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Primer Apellido</h2>
                <input type="text" name="primer_apellido" placeholder="Primer Apellido" value={user.primer_apellido} onChange={handleChange} required style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Segundo Apellido</h2>
                <input type="text" name="segundo_apellido" placeholder="Segundo Apellido" value={user.segundo_apellido} onChange={handleChange} style={formStyle.input} />

                <h2 style={formStyle.subtitle}>Género</h2>
                <select name="genero" value={user.genero} onChange={handleChange} required style={formStyle.input}>
                  <option value="">Selecciona género</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                </select>

                <h2 style={formStyle.subtitle}>Rol en el Sistema</h2>
                <select name="role" value={user.role} onChange={handleChange} required style={formStyle.input}>
                  <option value="">Selecciona rol</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="cajero">Cajero</option>
                  <option value="gerente">Gerente</option>
                </select>

                <h2 style={formStyle.subtitle}>Empresa</h2>
                <select name="company_id" value={user.company_id} onChange={handleChange} required style={formStyle.input}>
                  <option value="">Selecciona empresa</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>

                <h2 style={formStyle.subtitle}>Almacén</h2>
                <select
                  name="store_id"
                  value={user.store_id}
                  onChange={handleChange}
                  required
                  style={formStyle.input}
                  disabled={!user.company_id}
                >
                  <option value="">{user.company_id ? "Selecciona almacén" : "Selecciona empresa primero"}</option>
                  {filteredStores.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>

                <h2 style={formStyle.subtitle}>Correo Electrónico</h2>
                <input type="email" name="correo" placeholder="Correo" value={user.correo} onChange={handleChange} required style={formStyle.input} />

                <h3 style={formStyle.subtitle}>Dirección</h3>
                <select
                  name="region"
                  value={user.direccion.region}
                  onChange={handleChange}
                  required
                  style={formStyle.input}
                >
                  <option value="">Selecciona Región</option>
                  {regionesYcomunas.map((r) => (
                    <option key={r.region} value={r.region}>{r.region}</option>
                  ))}
                </select>
                <select
                  name="comuna"
                  value={user.direccion.comuna}
                  onChange={handleChange}
                  required
                  style={formStyle.input}
                  disabled={!user.direccion.region}
                >
                  <option value="">{user.direccion.region ? "Selecciona Comuna" : "Selecciona Región primero"}</option>
                  {comunasDisponibles.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input type="text" name="poblacion_villa" placeholder="Población/Villa" value={user.direccion.poblacion_villa} onChange={handleChange} required style={formStyle.input} />
                <input type="text" name="calle" placeholder="Calle" value={user.direccion.calle} onChange={handleChange} required style={formStyle.input} />
                <input type="number" name="numero" placeholder="Número" value={user.direccion.numero} onChange={handleChange} required style={formStyle.input} />

                <h3 style={formStyle.subtitle}>Contraseña</h3>
                <input type="password" name="password" placeholder="Contraseña" value={user.password} onChange={handleChange} required style={formStyle.input} />

                <button type="submit" style={formStyle.button}>Crear Usuario</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
