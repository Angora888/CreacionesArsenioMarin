import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const API_URL = import.meta.env.VITE_API_URL;

function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] =
    useState<Producto | null>(null);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);

        const response = await fetch(
          `${API_URL}/Productos/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Producto no encontrado"
          );
        }

        const data =
          await response.json();

        setProducto(data);

      } catch (error) {

        console.error(error);

        setError(
          "No fue posible cargar el producto."
        );

      } finally {

        setCargando(false);

      }
    };

    cargarProducto();

  }, [id]);

  if (cargando) {
    return (
      <main className="producto-detalle-pagina">
        <p>
          Cargando producto...
        </p>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="producto-detalle-pagina">

        <h1>
          Producto no encontrado
        </h1>

        <p>
          {error}
        </p>

        <Link
          to="/productos"
          className="boton-secundario"
        >
          Volver a productos
        </Link>

      </main>
    );
  }

  // ==========================================
  // WHATSAPP
  // ==========================================

  const telefonoWhatsApp =
    "50689914000";

  const precioFormateado =
    Number(
      producto.precio
    ).toLocaleString(
      "es-CR"
    );

  const urlProducto =
    window.location.href;

  const mensajeWhatsApp =
    encodeURIComponent(
`Hola 👋 Estoy interesado en este producto de Creaciones Arsenio Marin:

🪵 ${producto.nombre}

💰 Precio: ₡${precioFormateado}

🔗 ${urlProducto}

¿Me pueden dar más información?`
    );

  const urlWhatsApp =
    `https://wa.me/${telefonoWhatsApp}?text=${mensajeWhatsApp}`;

  return (
    <main className="producto-detalle-pagina">

      <Link
        to="/productos"
        className="producto-volver"
      >
        ← Volver a productos
      </Link>

      <section className="producto-detalle">

        {/* IMAGEN */}

        <div className="producto-detalle-imagen">

          {producto.imagenUrl ? (

            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
            />

          ) : (

            <div className="producto-detalle-sin-imagen">
              🪵
            </div>

          )}

        </div>

        {/* INFORMACIÓN */}

        <div className="producto-detalle-info">

          {producto.categoria && (

            <span className="producto-categoria">
              {producto.categoria.nombre}
            </span>

          )}

          <h1>
            {producto.nombre}
          </h1>

          <p className="producto-detalle-precio">

            ₡
            {Number(
              producto.precio
            ).toLocaleString(
              "es-CR"
            )}

          </p>

          {/* DISPONIBILIDAD */}

          <div
            className={
              producto.disponible
                ? "producto-estado disponible"
                : "producto-estado agotado"
            }
          >

            {producto.disponible
              ? "Disponible"
              : "No disponible"}

          </div>

          {/* DESCRIPCIÓN */}

          {producto.descripcion && (

            <p className="producto-detalle-descripcion">
              {producto.descripcion}
            </p>

          )}

          {/* WHATSAPP */}

          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-whatsapp"
          >
            Consultar por WhatsApp
          </a>

        </div>

      </section>

    </main>
  );
}

export default ProductoDetalle;