import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setCargando(true);
      setError("");

      const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje || "No fue posible iniciar sesión."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      navigate("/admin/productos");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("No fue posible iniciar sesión.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-pagina">
      <section className="login-card">
        <p className="etiqueta">ADMINISTRACIÓN</p>

        <h1>Iniciar sesión</h1>

        <p className="login-descripcion">
          Ingresa con tu cuenta de administrador.
        </p>

        <form onSubmit={iniciarSesion}>
          <div className="login-campo">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-campo">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button
            type="submit"
            className="boton-principal login-boton"
            disabled={cargando}
          >
            {cargando
              ? "Ingresando..."
              : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;