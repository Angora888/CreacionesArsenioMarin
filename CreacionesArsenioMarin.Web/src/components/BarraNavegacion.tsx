import { Link } from "react-router-dom";

function BarraNavegacion() {
  return (
    <header className="barra-navegacion">
      <div className="logo">
        <Link to="/">
          <span>Creaciones</span>
          <strong> Arsenio Marin</strong>
        </Link>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
      </nav>

      <Link to="/carrito" className="carrito">
        🛒
        <span>Carrito</span>
      </Link>
    </header>
  );
}

export default BarraNavegacion;