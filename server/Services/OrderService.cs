using System.Text.Json;
using server.Models;

namespace server.Services;

public sealed class OrderService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly string _storageFilePath;

    public OrderService(IWebHostEnvironment environment)
    {
        var appDataDirectory = ResolveAppDataDirectory(environment.ContentRootPath);
        Directory.CreateDirectory(appDataDirectory);
        _storageFilePath = Path.Combine(appDataDirectory, "orders.json");
    }

    public async Task<OrderRecord> SaveAsync(OrderRequest request, CancellationToken cancellationToken = default)
    {
        var subtotal = request.Items.Sum(item => item.Price * item.Quantity);
        var shipping = subtotal >= 3000m ? 0m : 120m;

        var record = new OrderRecord
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.Trim(),
            Phone = request.Phone.Trim(),
            Address = request.Address.Trim(),
            District = request.District.Trim(),
            Province = request.Province.Trim(),
            PostalCode = request.PostalCode.Trim(),
            PaymentMethod = request.PaymentMethod.Trim(),
            Items = request.Items.Select(item => new OrderItemRequest
            {
                ProductId = item.ProductId,
                Name = item.Name.Trim(),
                Price = item.Price,
                Quantity = item.Quantity,
                Image = item.Image
            }).ToList(),
            Subtotal = subtotal,
            Shipping = shipping,
            Total = subtotal + shipping,
            SubmittedAt = DateTimeOffset.UtcNow
        };

        await _gate.WaitAsync(cancellationToken);

        try
        {
            var records = await LoadAsync(cancellationToken);
            records.Add(record);

            await using var stream = File.Create(_storageFilePath);
            await JsonSerializer.SerializeAsync(stream, records, JsonOptions, cancellationToken);
        }
        finally
        {
            _gate.Release();
        }

        return record;
    }

    private async Task<List<OrderRecord>> LoadAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_storageFilePath))
        {
            return [];
        }

        await using var stream = File.OpenRead(_storageFilePath);
        var records = await JsonSerializer.DeserializeAsync<List<OrderRecord>>(stream, JsonOptions, cancellationToken);
        return records ?? [];
    }

    private static string ResolveAppDataDirectory(string contentRootPath)
    {
        if (Path.GetFileName(contentRootPath).Equals("server", StringComparison.OrdinalIgnoreCase))
        {
            return Path.Combine(contentRootPath, "App_Data");
        }

        var nestedServerDirectory = Path.Combine(contentRootPath, "server");
        if (Directory.Exists(nestedServerDirectory))
        {
            return Path.Combine(nestedServerDirectory, "App_Data");
        }

        return Path.Combine(contentRootPath, "App_Data");
    }
}
