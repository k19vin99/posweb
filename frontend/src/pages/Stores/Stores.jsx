import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import commonStyles from "../../styles/commonStyles";


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
      <div style={commonStyles.container}>
        <h2 style={commonStyles.h2}>Almacenes</h2>
        <table style={commonStyles.table}>
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
            {stores.map((store, index) => (
              <tr key={store.id} style={index % 2 === 0 ? commonStyles.rowWhite : commonStyles.rowGray}>
                <td style={commonStyles.td}>{store.id}</td>
                <td style={commonStyles.td}>{store.nombre}</td>
                <td style={commonStyles.td}>
                  {store.calle} {store.numero}, {store.poblacion_villa}, {store.comuna}, {store.region}
                </td>
                <td style={commonStyles.td}>{store.telefono}</td>
                <td style={commonStyles.td}>{store.correo}</td>
                <td style={commonStyles.td}>{store.empresa_nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
