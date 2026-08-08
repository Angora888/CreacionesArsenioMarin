using CreacionesArsenioMarin.Api.Data;
using CreacionesArsenioMarin.Api.Entities;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> ObtenerProductos()
    {
        var productos = await _context.Productos
            .Include(p => p.Categoria)
            .ToListAsync();

        return Ok(productos);
    }

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

    [HttpPost]
    public async Task<ActionResult<Producto>> CrearProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(ObtenerProducto),
            new { id = producto.Id },
            producto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarProducto(
        int id,
        Producto producto)
    {
        if (id != producto.Id)
        {
            return BadRequest(new
            {
                mensaje = "El ID del producto no coincide."
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

        productoExistente.Nombre = producto.Nombre;
        productoExistente.Descripcion = producto.Descripcion;
        productoExistente.Precio = producto.Precio;
        productoExistente.ImagenUrl = producto.ImagenUrl;
        productoExistente.Disponible = producto.Disponible;
        productoExistente.CategoriaId = producto.CategoriaId;

        await _context.SaveChangesAsync();

        return NoContent();
    }

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