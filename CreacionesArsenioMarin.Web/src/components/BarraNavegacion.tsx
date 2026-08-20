import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="barra-navegacion">

      <div className="logo">
        <Link to="/" onClick={cerrarMenu}>
          <span>Creaciones</span>
          <strong> Arsenio Marin</strong>
        </Link>
      </div>

      {/* BOTÓN HAMBURGUESA - SOLO CELULAR */}
      <button
        type="button"
        className={`menu-toggle ${menuAbierto ? "activo" : ""}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
        aria-expanded={menuAbierto}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* NAVEGACIÓN */}
      <nav className={menuAbierto ? "menu-abierto" : ""}>
        <Link
          to="/"
          onClick={cerrarMenu}
          className={location.pathname === "/" ? "activo" : ""}
        >
          Inicio
        </Link>

        <Link
          to="/productos"
          onClick={cerrarMenu}
          className={
            location.pathname.startsWith("/productos")
              ? "activo"
              : ""
          }
        >
          Productos
        </Link>

        <Link
          to="/nosotros"
          onClick={cerrarMenu}
          className={
            location.pathname === "/nosotros"
              ? "activo"
              : ""
          }
        >
          Nosotros
        </Link>
      </nav>

    </header>
  );
}

export default BarraNavegacion;