using System.Text.Json;
using server.Models;

namespace server.Services;

public sealed class CatalogDataService
{
    private readonly Dictionary<string, Category> _categoriesById;
    private readonly Dictionary<string, Product> _productsById;
    private readonly Dictionary<string, Article> _articlesById;

    public CatalogDataService(IWebHostEnvironment environment)
    {
        var dataDirectory = ResolveDataDirectory(environment.ContentRootPath);

        Categories = Load<List<Category>>(Path.Combine(dataDirectory, "categories.json"));
        Products = Load<List<Product>>(Path.Combine(dataDirectory, "products.json"));
        Articles = Load<List<Article>>(Path.Combine(dataDirectory, "articles.json"));
        ContactInfo = Load<ContactInfo>(Path.Combine(dataDirectory, "contact-info.json"));

        _categoriesById = Categories.ToDictionary(item => item.Id, StringComparer.OrdinalIgnoreCase);
        _productsById = Products.ToDictionary(item => item.Id, StringComparer.OrdinalIgnoreCase);
        _articlesById = Articles.ToDictionary(item => item.Id, StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<Category> Categories { get; }
    public IReadOnlyList<Product> Products { get; }
    public IReadOnlyList<Article> Articles { get; }
    public ContactInfo ContactInfo { get; }

    public Category? GetCategory(string id)
    {
        return _categoriesById.GetValueOrDefault(id);
    }

    public Product? GetProduct(string id)
    {
        return _productsById.GetValueOrDefault(id);
    }

    public Article? GetArticle(string id)
    {
        return _articlesById.GetValueOrDefault(id);
    }

    private static T Load<T>(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Data file was not found: {filePath}");
        }

        using var stream = File.OpenRead(filePath);
        var data = JsonSerializer.Deserialize<T>(stream, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return data ?? throw new InvalidOperationException($"Data file '{filePath}' could not be deserialized.");
    }

    private static string ResolveDataDirectory(string contentRootPath)
    {
        var candidateDirectories = new[]
        {
            Path.Combine(contentRootPath, "Data"),
            Path.Combine(contentRootPath, "server", "Data"),
            Path.Combine(AppContext.BaseDirectory, "Data"),
        };

        var existingDirectory = candidateDirectories.FirstOrDefault(Directory.Exists);
        if (existingDirectory is not null)
        {
            return existingDirectory;
        }

        throw new DirectoryNotFoundException(
            $"Could not locate a data directory. Checked: {string.Join(", ", candidateDirectories)}");
    }
}
