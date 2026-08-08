using CreacionesArsenioMarin.Api.Data;
using CreacionesArsenioMarin.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreacionesArsenioMarin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly AppDbContext _context;

    public PedidosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pedido>>> ObtenerPedidos()
    {
        var pedidos = await _context.Pedidos
            .Include(p => p.Detalles)
            .ThenInclude(d => d.Producto)
            .OrderByDescending(p => p.FechaPedido)
            .ToListAsync();

        return Ok(pedidos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Pedido>> ObtenerPedido(int id)
    {
        var pedido = await _context.Pedidos
            .Include(p => p.Detalles)
            .ThenInclude(d => d.Producto)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pedido == null)
        {
            return NotFound(new
            {
                mensaje = "Pedido no encontrado."
            });
        }

        return Ok(pedido);
    }

    [HttpPost]
    public async Task<ActionResult<Pedido>> CrearPedido(Pedido pedido)
    {
        if (pedido.Detalles == null || pedido.Detalles.Count == 0)
        {
            return BadRequest(new
            {
                mensaje = "El pedido debe contener al menos un producto."
            });
        }

        decimal total = 0;

        foreach (var detalle in pedido.Detalles)
        {
            var producto = await _context.Productos
                .FindAsync(detalle.ProductoId);

            if (producto == null)
            {
                return BadRequest(new
                {
                    mensaje = $"El producto {detalle.ProductoId} no existe."
                });
            }

            if (!producto.Disponible)
            {
                return BadRequest(new
                {
                    mensaje = $"El producto '{producto.Nombre}' no está disponible."
                });
            }

            detalle.PrecioUnitario = producto.Precio;
            detalle.Subtotal = producto.Precio * detalle.Cantidad;

            total += detalle.Subtotal;
        }

        pedido.Total = total;
        pedido.Estado = "Pendiente";
        pedido.FechaPedido = DateTime.UtcNow;

        _context.Pedidos.Add(pedido);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(ObtenerPedido),
            new { id = pedido.Id },
            pedido);
    }

    [HttpPut("{id}/estado")]
    public async Task<IActionResult> CambiarEstado(
        int id,
        [FromBody] string nuevoEstado)
    {
        var pedido = await _context.Pedidos.FindAsync(id);

        if (pedido == null)
        {
            return NotFound(new
            {
                mensaje = "Pedido no encontrado."
            });
        }

        pedido.Estado = nuevoEstado;

        await _context.SaveChangesAsync();

        return Ok(pedido);
    }
}