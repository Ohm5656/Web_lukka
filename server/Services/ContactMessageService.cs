using System.Text.Json;
using server.Models;

namespace server.Services;

public sealed class ContactMessageService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly string _storageFilePath;

    public ContactMessageService(IWebHostEnvironment environment)
    {
        var appDataDirectory = ResolveAppDataDirectory(environment.ContentRootPath);
        Directory.CreateDirectory(appDataDirectory);
        _storageFilePath = Path.Combine(appDataDirectory, "contact-submissions.json");
    }

    public async Task<ContactMessageRecord> SaveAsync(ContactMessageRequest request, CancellationToken cancellationToken = default)
    {
        var record = new ContactMessageRecord
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = request.Email.Trim(),
            Subject = request.Subject.Trim(),
            Message = request.Message.Trim(),
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

    private async Task<List<ContactMessageRecord>> LoadAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_storageFilePath))
        {
            return [];
        }

        await using var stream = File.OpenRead(_storageFilePath);
        var records = await JsonSerializer.DeserializeAsync<List<ContactMessageRecord>>(stream, JsonOptions, cancellationToken);
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
