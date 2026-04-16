namespace server.Models;

public sealed class ContactMessageRecord
{
    public string Id { get; init; } = Guid.NewGuid().ToString("N");
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Subject { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
    public DateTimeOffset SubmittedAt { get; init; } = DateTimeOffset.UtcNow;
}
