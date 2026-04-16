namespace server.Models;

public sealed class Article
{
    public string Id { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string Excerpt { get; init; } = string.Empty;
    public string Image { get; init; } = string.Empty;
    public string Date { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public string ReadTime { get; init; } = string.Empty;
    public string Content { get; init; } = string.Empty;
    public IReadOnlyList<string> RelatedProducts { get; init; } = [];
}
