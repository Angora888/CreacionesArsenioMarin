import { BrowserRouter, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/BarraNavegacion";
import PiePagina from "./components/PiePagina";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProductos from "./pages/AdminProductos";
import AdminProductoForm from "./pages/AdminProductoForm";
import "./App.css";
import Nosotros from "./pages/Nosotros";

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />}/>
        <Route path="/admin/productos" element={<ProtectedRoute> <AdminProductos /> </ProtectedRoute> }/>
        <Route path="/admin/productos/nuevo" element={<ProtectedRoute><AdminProductoForm /></ProtectedRoute>}/>
        <Route path="/admin/productos/:id/editar" element={<ProtectedRoute><AdminProductoForm /></ProtectedRoute>}/>
      </Routes>

      <PiePagina />
    </BrowserRouter>
  );
}

export default App;