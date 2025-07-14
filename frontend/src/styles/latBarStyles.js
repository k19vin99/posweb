const latBarStyles = {
  container: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "inline-flex",
    flexDirection: "column",
    padding: "25px",
    fontFamily: "POS WEB, sans-serif",
    borderRadius: "12px",
    alignSelf: "flex-start",
    margin: "75px", // separación del borde superior y lateral
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  linkHover: {
    color: "#6b7280",
  }
};

export default latBarStyles;
