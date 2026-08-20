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
            Piezas de madera y resina pensadas para darle un toque
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
          <h2>
            Donde la madera se convierte en historia.
            <br />
          </h2>

          <p>

Desde 1985, nuestra familia ha encontrado en la madera una forma de crear, trabajar y dejar huella. <br /> <br />
Todo comenzó con mi papá, quien durante muchos años se dedicó con pasión a la elaboración de souvenirs y diferentes trabajos en madera. Con sus manos, paciencia y dedicación fue construyendo no solo piezas únicas, sino también un legado que hoy queremos continuar.<br /> <br />
Con el paso de los años, decidimos darle un nuevo rumbo a esta tradición familiar, combinando la belleza natural de la madera con la creatividad y versatilidad de la resina epóxica.<br /> <br />
Así nacen nuestras mesas de río, piezas únicas en las que cada veta, cada forma y cada detalle de la madera se encuentra con el color y la transparencia de la resina para crear muebles que no existen dos veces iguales.<br /> <br />
Nuestro propósito es crear más que una mesa: queremos ofrecer piezas únicas, hechas con dedicación, carácter y una historia detrás.<br /> <br />
Cada proyecto es elaborado de manera artesanal, cuidando cada detalle desde la selección de la madera hasta el acabado final, para que nuestros clientes puedan llevar a sus hogares una pieza que perdure en el tiempo.
Más de 40 años de experiencia, una nueva generación y muchas historias por crear.
Bienvenidos a nuestro emprendimiento familiar, donde la madera, la resina y la pasión por crear se encuentran.
          </p>

          <Link to="/productos" className="boton-secundario">
            Explorar productos
          </Link>
        </div>

        <div className="">
        </div>
      </section>
    </main>
  );
}

export default Inicio;