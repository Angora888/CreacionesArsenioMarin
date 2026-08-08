import { Link } from "react-router-dom";

function Inicio() {
  return (
    <main>
      <section className="hero">
        <div className="hero-contenido">
          <p className="hero-etiqueta">CREACIONES ARTESANALES</p>

          <h1>
            Creaciones
            <br />
            Arsenio Marin
          </h1>

          <p className="hero-descripcion">
            Arte sobre madera desde 1985.
          </p>

          <Link to="/productos" className="boton-principal">
            Ver productos
          </Link>
        </div>
      </section>

      <section className="seccion">
        <div className="seccion-titulo">
          <p className="etiqueta">DESCUBRE</p>
          <h2>Nuestras creaciones</h2>
          <p>
            Piezas de madera pensadas para darle un toque
            especial a cada espacio.
          </p>
        </div>

        <div className="categorias">
          <div className="categoria">
            <div className="categoria-icono">🪵</div>
            <h3>Decoración</h3>
            <p>
              Detalles únicos para decorar tu hogar.
            </p>
          </div>

          <div className="categoria">
            <div className="categoria-icono">🏠</div>
            <h3>Hogar</h3>
            <p>
              Piezas funcionales y decorativas.
            </p>
          </div>

          <div className="categoria">
            <div className="categoria-icono">❤️</div>
            <h3>Personalizados</h3>
            <p>
              Creaciones hechas especialmente para ti.
            </p>
          </div>
        </div>
      </section>

      <section className="seccion seccion-artesanal">
        <div>
          <p className="etiqueta">HECHO A MANO</p>

          <h2>
            Madera que cuenta
            <br />
            una historia.
          </h2>

          <p>
            Cada pieza de Creaciones Arsenio Marin
            es elaborada con atención a los detalles,
            buscando que sea algo especial para quien
            la recibe.
          </p>

          <Link to="/productos" className="boton-secundario">
            Explorar productos
          </Link>
        </div>

        <div className="artesanal-imagen">
          🪵
        </div>
      </section>
    </main>
  );
}

export default Inicio;