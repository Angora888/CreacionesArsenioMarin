import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  obtenerProductos,
  obtenerCategorias,
  crearProducto,
  actualizarProducto,
  subirImagen,
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
};

function AdminProductoForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const editando = Boolean(id);

  const [categorias, setCategorias] =
    useState<Categoria[]>([]);

  const [nombre, setNombre] = useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [precio, setPrecio] = useState("");

  const [imagenUrl, setImagenUrl] =
    useState("");

  const [categoriaId, setCategoriaId] =
    useState("");

  const [disponible, setDisponible] =
    useState(true);

  const [cargando, setCargando] =
    useState(editando);

  const [guardando, setGuardando] =
    useState(false);

  const [subiendoImagen, setSubiendoImagen] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // ==========================================
  // CARGAR CATEGORÍAS Y PRODUCTO
  // ==========================================

  const cargarDatos = async () => {
    try {
      setError("");

      const datosCategorias =
        await obtenerCategorias();

      setCategorias(datosCategorias);

      // Si estamos creando uno nuevo,
      // solamente necesitamos las categorías.
      if (!editando) {
        return;
      }

      setCargando(true);

      const productos =
        await obtenerProductos();

      const producto = productos.find(
        (p: Producto) =>
          p.id === Number(id)
      );

      if (!producto) {
        throw new Error(
          "Producto no encontrado."
        );
      }

      setNombre(producto.nombre);

      setDescripcion(
        producto.descripcion ?? ""
      );

      setPrecio(
        producto.precio.toString()
      );

      setImagenUrl(
        producto.imagenUrl ?? ""
      );

      setCategoriaId(
        producto.categoriaId.toString()
      );

      setDisponible(
        producto.disponible
      );

    } catch (error) {

      console.error(error);

      setError(
        "No fue posible cargar la información."
      );

    } finally {

      setCargando(false);

    }
  };

  // ==========================================
  // SUBIR IMAGEN A AZURE BLOB STORAGE
  // ==========================================

  const manejarImagen = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const archivo =
      e.target.files?.[0];

    if (!archivo) {
      return;
    }

    try {

      setSubiendoImagen(true);
      setError("");

      const url =
        await subirImagen(archivo);

      // Azure nos devuelve la URL pública
      // y la guardamos para posteriormente
      // almacenarla con el producto.
      setImagenUrl(url);

    } catch (error) {

      console.error(error);

      if (
        error instanceof Error &&
        error.message ===
          "SESION_EXPIRADA"
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

        return;
      }

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible subir la imagen."
      );

    } finally {

      setSubiendoImagen(false);

    }
  };

  // ==========================================
  // GUARDAR PRODUCTO
  // ==========================================

  const guardar = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!categoriaId) {

      setError(
        "Debes seleccionar una categoría."
      );

      return;
    }

    if (Number(precio) < 0) {

      setError(
        "El precio no puede ser negativo."
      );

      return;
    }

    try {

      setGuardando(true);
      setError("");

      const producto = {

        nombre:
          nombre.trim(),

        descripcion:
          descripcion.trim(),

        precio:
          Number(precio),

        imagenUrl:
          imagenUrl.trim(),

        disponible,

        categoriaId:
          Number(categoriaId),

      };

      if (editando) {

        await actualizarProducto(
          Number(id),
          producto
        );

      } else {

        await crearProducto(
          producto
        );

      }

      navigate(
        "/admin/productos"
      );

    } catch (error) {

      console.error(error);

      if (
        error instanceof Error &&
        error.message ===
          "SESION_EXPIRADA"
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");

        return;
      }

      setError(
        "No fue posible guardar el producto."
      );

    } finally {

      setGuardando(false);

    }
  };

  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {

    return (
      <main className="admin-form-pagina">

        <p>
          Cargando producto...
        </p>

      </main>
    );
  }

  // ==========================================
  // FORMULARIO
  // ==========================================

  return (

    <main className="admin-form-pagina">

      <button
        type="button"
        className="admin-volver"
        onClick={() =>
          navigate(
            "/admin/productos"
          )
        }
      >
        ← Volver a productos
      </button>

      <section className="admin-form-card">

        <p className="etiqueta">
          ADMINISTRACIÓN
        </p>

        <h1>
          {editando
            ? "Editar producto"
            : "Nuevo producto"}
        </h1>

        <form onSubmit={guardar}>

          {/* NOMBRE */}

          <div className="admin-form-campo">

            <label htmlFor="nombre">
              Nombre
            </label>

            <input
              id="nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* DESCRIPCIÓN */}

          <div className="admin-form-campo">

            <label htmlFor="descripcion">
              Descripción
            </label>

            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
              rows={5}
            />

          </div>

          {/* PRECIO Y CATEGORÍA */}

          <div className="admin-form-grid">

            <div className="admin-form-campo">

              <label htmlFor="precio">
                Precio
              </label>

              <input
                id="precio"
                type="number"
                min="0"
                step="1"
                value={precio}
                onChange={(e) =>
                  setPrecio(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="admin-form-campo">

              <label htmlFor="categoria">
                Categoría
              </label>

              <select
                id="categoria"
                value={categoriaId}
                onChange={(e) =>
                  setCategoriaId(
                    e.target.value
                  )
                }
                required
              >

                <option value="">
                  Selecciona una categoría
                </option>

                {categorias.map(
                  (categoria) => (

                    <option
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nombre}
                    </option>

                  )
                )}

              </select>

            </div>

          </div>

          {/* IMAGEN */}

          <div className="admin-form-campo">

            <label htmlFor="imagen">
              Imagen del producto
            </label>

            <input
              id="imagen"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={manejarImagen}
              disabled={subiendoImagen}
            />

            {subiendoImagen && (
              <p className="admin-subiendo-imagen">
                Subiendo imagen...
              </p>
            )}

          </div>

          {/* VISTA PREVIA */}

          {imagenUrl && (

            <div className="admin-imagen-preview">

              <p>
                Vista previa
              </p>

              <img
                src={imagenUrl}
                alt="Vista previa del producto"
              />

            </div>

          )}

          {/* DISPONIBLE */}

          <label className="admin-checkbox">

            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) =>
                setDisponible(
                  e.target.checked
                )
              }
            />

            Producto disponible

          </label>

          {/* ERROR */}

          {error && (

            <p className="login-error">
              {error}
            </p>

          )}

          {/* GUARDAR */}

          <button
            type="submit"
            className="admin-guardar"
            disabled={
              guardando ||
              subiendoImagen
            }
          >

            {subiendoImagen
              ? "Subiendo imagen..."
              : guardando
              ? "Guardando..."
              : editando
              ? "Guardar cambios"
              : "Crear producto"}

          </button>

        </form>

      </section>

    </main>
  );
}

export default AdminProductoForm;