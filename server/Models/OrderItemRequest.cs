namespace server.Models;

public sealed class OrderItemRequest
{
    public string ProductId { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public int Quantity { get; init; }
    public string Image { get; init; } = string.Empty;
}
