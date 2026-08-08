using CreacionesArsenioMarin.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CreacionesArsenioMarin.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Categorias> Categorias => Set<Categorias>();

    public DbSet<Producto> Productos => Set<Producto>();

    public DbSet<DetallePedido> DetallesPedido => Set<DetallePedido>();

    public DbSet<Pedido> Pedidos => Set<Pedido>();
}