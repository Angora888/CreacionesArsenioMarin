import { Link, useNavigate } from "react-router-dom";

function PiePagina() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  return (
    <footer className="pie-pagina">
      <div>
        <h3>Creaciones Arsenio Marin</h3>

        <p>
          Decoración en madera hecha con dedicación.
        </p>
      </div>

      <div className="pie-admin">
        {token ? (
          <>
            <Link
              to="/admin/productos"
              className="pie-admin-link"
            >
              Ir al panel
            </Link>

            <button
              type="button"
              className="pie-admin-salir"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="pie-admin-link"
          >
            Iniciar sesión
          </Link>
        )}
      </div>

      <div>
        <p>© 2026 Creaciones Arsenio Marin</p>
      </div>
    </footer>
  );
}

export default PiePagina;