import { Link } from "react-router-dom";
import { useState } from "react";
import latBarStyles from "../styles/latBarStyles";

export default function LatBar() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { to: "/home", label: "Home" },
    { to: "/products", label: "Productos" },
    { to: "/products/add", label: "Agregar Producto" },
    { to: "/companies", label: "Empresas" },
    { to: "/add-company", label: "Agregar Empresa" },
    { to: "/stores", label: "Almacenes" },
    { to: "/add-store", label: "Agregar Almacén" },
    { to: "/users", label: "Usuarios" },
    { to: "/add-user", label: "Agregar Usuario" },
    { to: "/profile", label: "Mi Perfil" },
  ];

  return (
    <div style={latBarStyles.container}>
      <h1 style={latBarStyles.title}>Menú</h1>

      <nav style={latBarStyles.nav}>
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            style={{
              ...latBarStyles.link,
              ...(hoveredLink === idx ? latBarStyles.linkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(idx)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
