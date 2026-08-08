namespace CreacionesArsenioMarin.Api.Entities;

public class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public string? ImagenUrl { get; set; }

    public bool Disponible { get; set; } = true;

    public int CategoriaId { get; set; }

    public Categorias Categoria { get; set; } = null!;
}