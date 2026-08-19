using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CreacionesArsenioMarin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class ImagenesController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public ImagenesController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("subir")]
    public async Task<IActionResult> SubirImagen(IFormFile archivo)
    {
        if (archivo == null || archivo.Length == 0)
        {
            return BadRequest(new
            {
                mensaje = "Debe seleccionar una imagen."
            });
        }

        var tiposPermitidos = new[]
        {
            "image/jpeg",
            "image/png",
            "image/webp"
        };

        if (!tiposPermitidos.Contains(archivo.ContentType))
        {
            return BadRequest(new
            {
                mensaje = "Solo se permiten imágenes JPG, PNG o WEBP."
            });
        }

        const long maximo = 5 * 1024 * 1024;

        if (archivo.Length > maximo)
        {
            return BadRequest(new
            {
                mensaje = "La imagen no puede superar los 5 MB."
            });
        }

        var connectionString =
            _configuration["AzureStorage:ConnectionString"];

        var containerName =
            _configuration["AzureStorage:Container"];

        if (string.IsNullOrWhiteSpace(connectionString) ||
            string.IsNullOrWhiteSpace(containerName))
        {
            return StatusCode(500, new
            {
                mensaje = "Azure Storage no está configurado."
            });
        }

        var containerClient =
            new BlobContainerClient(
                connectionString,
                containerName);

        await containerClient.CreateIfNotExistsAsync(
            PublicAccessType.Blob);

        var extension = Path.GetExtension(archivo.FileName);

        var nombreArchivo =
            $"{Guid.NewGuid()}{extension}";

        var blobClient =
            containerClient.GetBlobClient(nombreArchivo);

        await using var stream =
            archivo.OpenReadStream();

        await blobClient.UploadAsync(
            stream,
            new BlobHttpHeaders
            {
                ContentType = archivo.ContentType
            });

        return Ok(new
        {
            url = blobClient.Uri.ToString()
        });
    }
}