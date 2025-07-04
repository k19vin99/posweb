import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Para obtener el ID de la URL

export default function EditCompany() {
  const { id } = useParams(); // Obtener el ID de la empresa desde la URL
  const [empresa, setEmpresa] = useState({});
  const [almacenes, setAlmacenes] = useState([]);
  const [selectedAlmacenes, setSelectedAlmacenes] = useState([]);

  useEffect(() => {
    // Cargar la empresa por ID
    const fetchEmpresa = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/companies/${id}`);
        setEmpresa(res.data);
        setSelectedAlmacenes(res.data.almacenes.map(store => store.id));
      } catch (err) {
        console.error("Error al cargar la empresa", err);
      }
    };

    // Cargar todos los almacenes disponibles
    const fetchAlmacenes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/stores");
        setAlmacenes(res.data);
      } catch (err) {
        console.error("Error al cargar los almacenes", err);
      }
    };

    fetchEmpresa();
    fetchAlmacenes();
  }, [id]);

  const handleChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedAlmacenes(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCompany = {
      nombre: empresa.nombre,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
      correo: empresa.correo,
      almacenes: selectedAlmacenes,
    };

    try {
      await axios.put(`http://localhost:3001/api/companies/${id}`, updatedCompany);
      alert("Empresa actualizada correctamente.");
    } catch (err) {
      console.error("Error al actualizar la empresa", err);
    }
  };

  return (
    <div>
      <h2>Editar Empresa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={empresa.nombre || ""}
          onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
          placeholder="Nombre de la empresa"
        />
        <input
          type="text"
          value={empresa.direccion || ""}
          onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })}
          placeholder="Dirección"
        />
        <input
          type="text"
          value={empresa.telefono || ""}
          onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })}
          placeholder="Teléfono"
        />
        <input
          type="email"
          value={empresa.correo || ""}
          onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
          placeholder="Correo"
        />

        <select
          multiple
          value={selectedAlmacenes}
          onChange={handleChange}
          style={styles.select}
        >
          {almacenes.map((almacen) => (
            <option key={almacen.id} value={almacen.id}>
              {almacen.nombre}
            </option>
          ))}
        </select>

        <button type="submit" style={styles.button}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

const styles = {
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
