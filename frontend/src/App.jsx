import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products/Products";
import Stores from "./pages/Stores/Stores";
import Companies from "./pages/Companies/Companies";
import EditCompany from "./pages/Companies/EditCompany";
import Users from "./pages/Users/Users";
import PrivateRoute from "./components/PrivateRoute";
import AddCompany from "./pages/Companies/AddCompany";
import AddStore from "./pages/Stores/AddStore";
import AddUser from "./pages/Users/AddUser";
import ProductEdit from "./pages/Products/ProductEdit";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/stores" element={<PrivateRoute><Stores /></PrivateRoute>} />
          <Route path="/companies" element={<PrivateRoute><Companies /></PrivateRoute>} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/edit-company/:id" element={<PrivateRoute><EditCompany /></PrivateRoute>} /> {/* Ruta para editar */}
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/add-store" element={<AddStore />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/products/:id" element={<PrivateRoute><ProductEdit /></PrivateRoute>} /> {/* Ruta para editar producto */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
