using CreacionesArsenioMarin.Api.Data;
using CreacionesArsenioMarin.Api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreacionesArsenioMarin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Productos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> ObtenerProductos()
    {
        var productos = await _context.Productos
            .Include(p => p.Categoria)
            .OrderBy(p => p.Nombre)
            .ToListAsync();

        return Ok(productos);
    }

    // GET: api/Productos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Producto>> ObtenerProducto(int id)
    {
        var producto = await _context.Productos
            .Include(p => p.Categoria)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (producto == null)
        {
            return NotFound(new
            {
                mensaje = "Producto no encontrado."
            });
        }

        return Ok(producto);
    }

    // POST: api/Productos
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Producto>> CrearProducto(
        ProductoDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre))
        {
            return BadRequest(new
            {
                mensaje = "El nombre del producto es obligatorio."
            });
        }

        if (dto.Precio < 0)
        {
            return BadRequest(new
            {
                mensaje = "El precio no puede ser negativo."
            });
        }

        var categoriaExiste = await _context.Categorias
            .AnyAsync(c => c.Id == dto.CategoriaId);

        if (!categoriaExiste)
        {
            return BadRequest(new
            {
                mensaje = "La categoría seleccionada no existe."
            });
        }

        var producto = new Producto
        {
            Nombre = dto.Nombre.Trim(),
            Descripcion = dto.Descripcion?.Trim(),
            Precio = dto.Precio,
            ImagenUrl = string.IsNullOrWhiteSpace(dto.ImagenUrl)
                ? null
                : dto.ImagenUrl.Trim(),
            Disponible = dto.Disponible,
            CategoriaId = dto.CategoriaId
        };

        _context.Productos.Add(producto);

        await _context.SaveChangesAsync();

        await _context.Entry(producto)
            .Reference(p => p.Categoria)
            .LoadAsync();

        return CreatedAtAction(
            nameof(ObtenerProducto),
            new { id = producto.Id },
            producto);
    }

    // PUT: api/Productos/5
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarProducto(
        int id,
        ProductoDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre))
        {
            return BadRequest(new
            {
                mensaje = "El nombre del producto es obligatorio."
            });
        }

        if (dto.Precio < 0)
        {
            return BadRequest(new
            {
                mensaje = "El precio no puede ser negativo."
            });
        }

        var productoExistente = await _context.Productos
            .FindAsync(id);

        if (productoExistente == null)
        {
            return NotFound(new
            {
                mensaje = "Producto no encontrado."
            });
        }

        var categoriaExiste = await _context.Categorias
            .AnyAsync(c => c.Id == dto.CategoriaId);

        if (!categoriaExiste)
        {
            return BadRequest(new
            {
                mensaje = "La categoría seleccionada no existe."
            });
        }

        productoExistente.Nombre = dto.Nombre.Trim();
        productoExistente.Descripcion =
            dto.Descripcion?.Trim();
        productoExistente.Precio = dto.Precio;
        productoExistente.ImagenUrl =
            string.IsNullOrWhiteSpace(dto.ImagenUrl)
                ? null
                : dto.ImagenUrl.Trim();
        productoExistente.Disponible =
            dto.Disponible;
        productoExistente.CategoriaId =
            dto.CategoriaId;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Productos/5
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarProducto(int id)
    {
        var producto = await _context.Productos
            .FindAsync(id);

        if (producto == null)
        {
            return NotFound(new
            {
                mensaje = "Producto no encontrado."
            });
        }

        _context.Productos.Remove(producto);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class ProductoDto
{
    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public string? ImagenUrl { get; set; }

    public bool Disponible { get; set; } = true;

    public int CategoriaId { get; set; }
}