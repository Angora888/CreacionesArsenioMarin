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

export async function eliminarProducto(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/Productos/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 401) {
    throw new Error("SESION_EXPIRADA");
  }

  if (!response.ok) {
    throw new Error(
      `Error al eliminar producto: ${response.status}`
    );
  }
}

export type ProductoGuardar = {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  disponible: boolean;
  categoriaId: number;
};

export async function crearProducto(
  producto: ProductoGuardar
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/Productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (response.status === 401) {
    throw new Error("SESION_EXPIRADA");
  }

  if (!response.ok) {
    throw new Error(
      `Error al crear producto: ${response.status}`
    );
  }

  return response.json();
}

export async function actualizarProducto(
  id: number,
  producto: ProductoGuardar
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/Productos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...producto
      }),
    }
  );

  if (response.status === 401) {
    throw new Error("SESION_EXPIRADA");
  }

  if (!response.ok) {
    throw new Error(
      `Error al actualizar producto: ${response.status}`
    );
  }
}

export async function subirImagen(archivo: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("archivo", archivo);

  const response = await fetch(
    `${API_URL}/Imagenes/subir`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (response.status === 401) {
    throw new Error("SESION_EXPIRADA");
  }

  if (!response.ok) {
    throw new Error(
      data.mensaje ||
      "No fue posible subir la imagen."
    );
  }

  return data.url;
}