using CreacionesArsenioMarin.Api.Data;
using CreacionesArsenioMarin.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreacionesArsenioMarin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categorias>>> ObtenerCategorias()
    {
        var categorias = await _context.Categorias
            .ToListAsync();

        return Ok(categorias);
    }

    [HttpPost]
    public async Task<ActionResult<Categorias>> CrearCategoria(
        Categorias categoria)
    {
        _context.Categorias.Add(categoria);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(ObtenerCategorias),
            new { id = categoria.Id },
            categoria);
    }
}