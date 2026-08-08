using CreacionesArsenioMarin.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Conexión a PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Controladores
builder.Services.AddControllers();

// OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Configuración para desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Activar los controladores de la API
app.MapControllers();

app.Run();