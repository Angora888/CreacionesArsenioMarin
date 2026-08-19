import { useEffect, useState } from "react";
import {
  obtenerProductos,
  obtenerCategorias,
} from "../services/api";
import { Link } from "react-router-dom";

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

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<number | null>(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");

      const [datosProductos, datosCategorias] =
        await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);

      setProductos(datosProductos);
      setCategorias(datosCategorias);
    } catch (error) {
      console.error(error);
      setError(
        "No fue posible cargar los productos."
      );
    } finally {
      setCargando(false);
    }
  };

  const productosFiltrados =
    categoriaSeleccionada === null
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoriaId ===
            categoriaSeleccionada
        );

  if (cargando) {
    return (
      <main className="productos-pagina">
        <h1>Nuestras creaciones</h1>
        <p>Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="productos-pagina">
        <h1>Nuestras creaciones</h1>

        <p>{error}</p>

        <button
          type="button"
          className="filtro-categoria"
          onClick={cargarDatos}
        >
          Intentar nuevamente
        </button>
      </main>
    );
  }

  return (
    <main className="productos-pagina">
      <section className="productos-encabezado">
        <p className="etiqueta">
          NUESTRO TRABAJO
        </p>

        <h1>Nuestras creaciones</h1>

        <p>
          Piezas artesanales elaboradas en
          madera y resina, creadas para darle
          carácter a cada espacio.
        </p>
      </section>

      {/* FILTROS POR CATEGORÍA */}
      <section className="filtros-categorias">
        <button
          type="button"
          className={
            categoriaSeleccionada === null
              ? "filtro-categoria activo"
              : "filtro-categoria"
          }
          onClick={() =>
            setCategoriaSeleccionada(null)
          }
        >
          Todos
        </button>

        {categorias.map((categoria) => (
          <button
            type="button"
            key={categoria.id}
            className={
              categoriaSeleccionada ===
              categoria.id
                ? "filtro-categoria activo"
                : "filtro-categoria"
            }
            onClick={() =>
              setCategoriaSeleccionada(
                categoria.id
              )
            }
          >
            {categoria.nombre}
          </button>
        ))}
      </section>

      {/* PRODUCTOS */}
      <section className="productos-grid">
        {productosFiltrados.length === 0 ? (
          <p>
            No hay productos disponibles en esta
            categoría.
          </p>
        ) : (
          productosFiltrados.map((producto) => (
            <article
              className="producto-card"
              key={producto.id}
            >
              <div className="producto-imagen-contenedor">
                {producto.imagenUrl ? (
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                ) : (
                  <div className="producto-sin-imagen">
                    🪵
                  </div>
                )}
              </div>

              <div className="producto-contenido">
                {producto.categoria && (
                  <span className="producto-categoria">
                    {
                      producto.categoria
                        .nombre
                    }
                  </span>
                )}

                <h2>{producto.nombre}</h2>

                {producto.descripcion && (
                  <p className="producto-descripcion">
                    {producto.descripcion}
                  </p>
                )}

                <div className="producto-footer">
                  <strong className="producto-precio">
                    ₡
                    {Number(
                      producto.precio
                    ).toLocaleString(
                      "es-CR"
                    )}
                  </strong>

                  {!producto.disponible && (
                    <span className="producto-agotado">
                      No disponible
                    </span>
                  )}
                </div>

                <Link
                  to={`/productos/${producto.id}`}
                  className="producto-ver-detalle"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Productos;