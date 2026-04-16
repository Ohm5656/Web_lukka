namespace server.Models;

public sealed class OrderRecord
{
    public string OrderId { get; init; } = $"TH-{Random.Shared.Next(100000, 999999)}";
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Phone { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public string District { get; init; } = string.Empty;
    public string Province { get; init; } = string.Empty;
    public string PostalCode { get; init; } = string.Empty;
    public string PaymentMethod { get; init; } = string.Empty;
    public List<OrderItemRequest> Items { get; init; } = [];
    public decimal Subtotal { get; init; }
    public decimal Shipping { get; init; }
    public decimal Total { get; init; }
    public DateTimeOffset SubmittedAt { get; init; } = DateTimeOffset.UtcNow;
}
