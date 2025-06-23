import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/products";
import Stores from "./pages/Stores";
import Companies from "./pages/Companies";
import EditCompany from "./pages/EditCompany";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import AddCompany from "./pages/AddCompany";
import AddStore from "./pages/AddStore";

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

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
