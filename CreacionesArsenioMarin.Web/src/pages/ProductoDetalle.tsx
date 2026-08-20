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

  // ==========================================
  // CARGAR PRODUCTO
  // ==========================================

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        setError("");

        const response = await fetch(
          `${API_URL}/Productos/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Producto no encontrado"
          );
        }

        const data: Producto =
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

  // ==========================================
  // SEO DINÁMICO DEL PRODUCTO
  // ==========================================

  useEffect(() => {

    if (!producto) {
      return;
    }

    // TITLE
    document.title =
      `${producto.nombre} | Creaciones Arsenio Marin`;

    // DESCRIPTION
    let metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!metaDescription) {

      metaDescription =
        document.createElement("meta");

      metaDescription.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        metaDescription
      );
    }

    const descripcionSEO =
      producto.descripcion
        ? producto.descripcion.substring(0, 155)
        : `${producto.nombre} elaborado artesanalmente en madera y resina epóxica por Creaciones Arsenio Marin.`;

    metaDescription.setAttribute(
      "content",
      descripcionSEO
    );

    // CANONICAL
    let canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonical) {

      canonical =
        document.createElement("link");

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonical
      );
    }

    canonical.setAttribute(
      "href",
      window.location.href
    );

    // OPEN GRAPH TITLE
    let ogTitle =
      document.querySelector(
        'meta[property="og:title"]'
      );

    if (!ogTitle) {

      ogTitle =
        document.createElement("meta");

      ogTitle.setAttribute(
        "property",
        "og:title"
      );

      document.head.appendChild(
        ogTitle
      );
    }

    ogTitle.setAttribute(
      "content",
      `${producto.nombre} | Creaciones Arsenio Marin`
    );

    // OPEN GRAPH DESCRIPTION
    let ogDescription =
      document.querySelector(
        'meta[property="og:description"]'
      );

    if (!ogDescription) {

      ogDescription =
        document.createElement("meta");

      ogDescription.setAttribute(
        "property",
        "og:description"
      );

      document.head.appendChild(
        ogDescription
      );
    }

    ogDescription.setAttribute(
      "content",
      descripcionSEO
    );

    // OPEN GRAPH IMAGE
    if (producto.imagenUrl) {

      let ogImage =
        document.querySelector(
          'meta[property="og:image"]'
        );

      if (!ogImage) {

        ogImage =
          document.createElement("meta");

        ogImage.setAttribute(
          "property",
          "og:image"
        );

        document.head.appendChild(
          ogImage
        );
      }

      ogImage.setAttribute(
        "content",
        producto.imagenUrl
      );
    }

    // OPEN GRAPH URL
    let ogUrl =
      document.querySelector(
        'meta[property="og:url"]'
      );

    if (!ogUrl) {

      ogUrl =
        document.createElement("meta");

      ogUrl.setAttribute(
        "property",
        "og:url"
      );

      document.head.appendChild(
        ogUrl
      );
    }

    ogUrl.setAttribute(
      "content",
      window.location.href
    );

    // RESTAURAR SEO GENERAL AL SALIR
    return () => {

      document.title =
        "Creaciones Arsenio Marin | Mesas de Resina y Madera Artesanal";

      const description =
        document.querySelector(
          'meta[name="description"]'
        );

      description?.setAttribute(
        "content",
        "Creaciones Arsenio Marin: muebles y piezas artesanales en madera y resina epóxica. Mesas de río, decoración y diseños únicos."
      );

    };

  }, [producto]);

  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {

    return (
      <main className="producto-detalle-pagina">

        <p>
          Cargando producto...
        </p>

      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

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

  // ==========================================
  // HTML
  // ==========================================

  return (
    <main className="producto-detalle-pagina">

      <Link
        to="/productos"
        className="producto-volver"
      >
        ← Volver a productos
      </Link>

      <section className="producto-detalle">

        <div className="producto-detalle-imagen">

          {producto.imagenUrl ? (

            <img
              src={producto.imagenUrl}
              alt={`${producto.nombre} - Creaciones Arsenio Marin`}
            />

          ) : (

            <div className="producto-detalle-sin-imagen">
              🪵
            </div>

          )}

        </div>

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
            {precioFormateado}

          </p>

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

          {producto.descripcion && (

            <p className="producto-detalle-descripcion">
              {producto.descripcion}
            </p>

          )}

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