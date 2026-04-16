namespace server.Models;

public sealed class Product
{
    public string Id { get; init; } = string.Empty;
    public string CategoryId { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public string Description { get; init; } = string.Empty;
    public string Image { get; init; } = string.Empty;
    public IReadOnlyList<string> Features { get; init; } = [];
    public IReadOnlyList<string> Highlights { get; init; } = [];
    public IReadOnlyDictionary<string, string> Specs { get; init; } = new Dictionary<string, string>();
    public bool IsNew { get; init; }
    public bool IsFeatured { get; init; }
    public string WhoIsItFor { get; init; } = string.Empty;
    public string BestFor { get; init; } = string.Empty;
    public string BuyingGuideText { get; init; } = string.Empty;
    public string Advice { get; init; } = string.Empty;
}
