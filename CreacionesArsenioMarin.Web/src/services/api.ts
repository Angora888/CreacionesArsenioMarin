const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerProductos() {
  const response = await fetch(`${API_URL}/Productos`);

  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.status}`);
  }

  return response.json();
}

export async function obtenerCategorias() {
  const response = await fetch(`${API_URL}/Categorias`);

  if (!response.ok) {
    throw new Error(`Error al obtener categorías: ${response.status}`);
  }

  return response.json();
}