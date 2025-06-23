import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Stores() {
  const [stores, setStores] = useState([]);

  // Fetch stores
  const fetchStores = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/stores");
      setStores(response.data);  // Guarda los almacenes
    } catch (error) {
      console.error("Error al cargar los almacenes:", error);
    }
  };

  useEffect(() => {
    fetchStores();  // Cargar almacenes cuando se monta el componente
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Almacenes</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>{store.almacén}</td>
                <td>{store.direccion_id}</td>
                <td>{store.telefono}</td>
                <td>{store.correo}</td>
                <td>{store.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "POS WEB",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  td: {
    textAlign: "center",
    padding: "12px",
  },
};
