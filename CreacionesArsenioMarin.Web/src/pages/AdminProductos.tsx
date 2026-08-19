import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerProductos,
  eliminarProducto,
} from "../services/api";

type Categoria = {
  id: number;
  nombre: string;
};

type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  disponible: boolean;
  categoriaId: number;
  categoria?: Categoria;
};

function AdminProductos() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const usuarioGuardado =
    localStorage.getItem("usuario");

  const usuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerProductos();

      setProductos(datos);
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible cargar los productos."
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = async (
    producto: Producto
  ) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${producto.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarProducto(producto.id);

      setProductos((actuales) =>
        actuales.filter(
          (p) => p.id !== producto.id
        )
      );
    } catch (error) {
      console.error(error);

      if (
        error instanceof Error &&
        error.message === "SESION_EXPIRADA"
      ) {
        cerrarSesion();
        return;
      }

      alert(
        "No fue posible eliminar el producto."
      );
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  };

  return (
    <main className="admin-pagina">
      <div className="admin-encabezado">
        <div>
          <p className="etiqueta">
            ADMINISTRACIÓN
          </p>

          <h1>Productos</h1>

          <p>
            Bienvenido,{" "}
            {usuario?.nombre ?? "Administrador"}.
          </p>
        </div>

        <div className="admin-acciones">
            <button
            type="button"
            className="admin-nuevo"
            onClick={() =>
                navigate("/admin/productos/nuevo")
            }
            >
            + Nuevo producto
            </button>

          <button
            type="button"
            className="admin-salir"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div className="admin-tabla-contenedor">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <div className="admin-producto">
                      {producto.imagenUrl && (
                        <img
                          src={producto.imagenUrl}
                          alt={producto.nombre}
                        />
                      )}

                      <strong>
                        {producto.nombre}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {producto.categoria?.nombre ??
                      "Sin categoría"}
                  </td>

                  <td>
                    ₡
                    {Number(
                      producto.precio
                    ).toLocaleString("es-CR")}
                  </td>

                  <td>
                    <span
                      className={
                        producto.disponible
                          ? "admin-estado disponible"
                          : "admin-estado agotado"
                      }
                    >
                      {producto.disponible
                        ? "Disponible"
                        : "No disponible"}
                    </span>
                  </td>

                  <td>
                    <div className="admin-fila-acciones">
                        <button
                        type="button"
                        onClick={() =>
                            navigate(
                            `/admin/productos/${producto.id}/editar`
                            )
                        }
                        >
                        Editar
                        </button>

                      <button
                        type="button"
                        className="admin-eliminar"
                        onClick={() =>
                          manejarEliminar(producto)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default AdminProductos;