namespace server.Models;

public sealed class OrderRequest
{
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
}
