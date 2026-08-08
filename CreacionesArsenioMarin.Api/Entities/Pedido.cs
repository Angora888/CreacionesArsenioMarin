namespace CreacionesArsenioMarin.Api.Entities;

public class Pedido
{
    public int Id { get; set; }

    public string NombreCliente { get; set; } = string.Empty;

    public string TelefonoCliente { get; set; } = string.Empty;

    public DateTime FechaPedido { get; set; } = DateTime.UtcNow;

    public string Estado { get; set; } = "Pendiente";

    public decimal Total { get; set; }

    public List<DetallePedido> Detalles { get; set; } = new();
}