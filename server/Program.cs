using Microsoft.Extensions.FileProviders;
using System.Net.Mail;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var allowedOrigins =
    builder.Configuration.GetSection("Frontend:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientApp", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<CatalogDataService>();
builder.Services.AddSingleton<ContactMessageService>();
builder.Services.AddSingleton<OrderService>();

var app = builder.Build();

app.UseCors("ClientApp");

var api = app.MapGroup("/api");

api.MapGet("/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "techhaven-server",
        timestamp = DateTimeOffset.UtcNow
    });
});

api.MapGet("/meta", (CatalogDataService catalog) =>
{
    return Results.Ok(new
    {
        project = "TechHaven",
        backend = ".NET 10 ASP.NET Core",
        frontend = "React + Vite",
        migrationPhase = "phase-4-dotnet-hosts-frontend",
        counts = new
        {
            categories = catalog.Categories.Count,
            products = catalog.Products.Count,
            articles = catalog.Articles.Count
        },
        nextStep = "polish remaining pages and deploy the combined app"
    });
});

api.MapGet("/categories", (CatalogDataService catalog) => Results.Ok(catalog.Categories));

api.MapGet("/categories/{id}", (string id, CatalogDataService catalog) =>
{
    var category = catalog.GetCategory(id);
    return category is null ? Results.NotFound() : Results.Ok(category);
});

api.MapGet("/products", (CatalogDataService catalog) => Results.Ok(catalog.Products));

api.MapGet("/products/{id}", (string id, CatalogDataService catalog) =>
{
    var product = catalog.GetProduct(id);
    return product is null ? Results.NotFound() : Results.Ok(product);
});

api.MapGet("/articles", (CatalogDataService catalog) => Results.Ok(catalog.Articles));

api.MapGet("/articles/{id}", (string id, CatalogDataService catalog) =>
{
    var article = catalog.GetArticle(id);
    return article is null ? Results.NotFound() : Results.Ok(article);
});

api.MapGet("/site/contact-info", (CatalogDataService catalog) => Results.Ok(catalog.ContactInfo));

api.MapPost("/contact", async (ContactMessageRequest request, ContactMessageService contactMessages, CancellationToken cancellationToken) =>
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(request.FirstName))
    {
        errors["firstName"] = ["กรุณากรอกชื่อ"];
    }

    if (string.IsNullOrWhiteSpace(request.LastName))
    {
        errors["lastName"] = ["กรุณากรอกนามสกุล"];
    }

    if (string.IsNullOrWhiteSpace(request.Email))
    {
        errors["email"] = ["กรุณากรอกอีเมล"];
    }
    else
    {
        try
        {
            _ = new MailAddress(request.Email);
        }
        catch
        {
            errors["email"] = ["รูปแบบอีเมลไม่ถูกต้อง"];
        }
    }

    if (string.IsNullOrWhiteSpace(request.Subject))
    {
        errors["subject"] = ["กรุณาเลือกหัวข้อที่ต้องการสอบถาม"];
    }

    if (string.IsNullOrWhiteSpace(request.Message))
    {
        errors["message"] = ["กรุณากรอกข้อความ"];
    }
    else if (request.Message.Trim().Length < 10)
    {
        errors["message"] = ["กรุณาระบุรายละเอียดเพิ่มเติมอย่างน้อย 10 ตัวอักษร"];
    }

    if (errors.Count > 0)
    {
        return Results.ValidationProblem(errors);
    }

    var savedMessage = await contactMessages.SaveAsync(request, cancellationToken);

    return Results.Ok(new
    {
        message = "ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
        submissionId = savedMessage.Id,
        submittedAt = savedMessage.SubmittedAt
    });
});

api.MapPost("/orders", async (OrderRequest request, OrderService orders, CancellationToken cancellationToken) =>
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(request.FirstName))
    {
        errors["firstName"] = ["กรุณากรอกชื่อ"];
    }

    if (string.IsNullOrWhiteSpace(request.LastName))
    {
        errors["lastName"] = ["กรุณากรอกนามสกุล"];
    }

    if (string.IsNullOrWhiteSpace(request.Email))
    {
        errors["email"] = ["กรุณากรอกอีเมล"];
    }
    else
    {
        try
        {
            _ = new MailAddress(request.Email);
        }
        catch
        {
            errors["email"] = ["รูปแบบอีเมลไม่ถูกต้อง"];
        }
    }

    if (string.IsNullOrWhiteSpace(request.Phone))
    {
        errors["phone"] = ["กรุณากรอกเบอร์โทรศัพท์"];
    }

    if (string.IsNullOrWhiteSpace(request.Address))
    {
        errors["address"] = ["กรุณากรอกที่อยู่"];
    }

    if (string.IsNullOrWhiteSpace(request.District))
    {
        errors["district"] = ["กรุณากรอกเขตหรืออำเภอ"];
    }

    if (string.IsNullOrWhiteSpace(request.Province))
    {
        errors["province"] = ["กรุณากรอกจังหวัด"];
    }

    if (string.IsNullOrWhiteSpace(request.PostalCode))
    {
        errors["postalCode"] = ["กรุณากรอกรหัสไปรษณีย์"];
    }

    if (string.IsNullOrWhiteSpace(request.PaymentMethod))
    {
        errors["paymentMethod"] = ["กรุณาเลือกวิธีชำระเงิน"];
    }

    if (request.Items.Count == 0)
    {
        errors["items"] = ["ไม่พบสินค้าในคำสั่งซื้อ"];
    }
    else if (request.Items.Any(item => item.Quantity < 1))
    {
        errors["items"] = ["จำนวนสินค้าต้องมากกว่า 0"];
    }

    if (errors.Count > 0)
    {
        return Results.ValidationProblem(errors);
    }

    var savedOrder = await orders.SaveAsync(request, cancellationToken);

    return Results.Ok(new
    {
        message = "ยืนยันคำสั่งซื้อเรียบร้อยแล้ว",
        orderId = savedOrder.OrderId,
        submittedAt = savedOrder.SubmittedAt,
        totals = new
        {
            subtotal = savedOrder.Subtotal,
            shipping = savedOrder.Shipping,
            total = savedOrder.Total
        }
    });
});

var clientDistPath = ResolveClientDistPath(app.Environment.ContentRootPath);
var clientIndexPath = Path.Combine(clientDistPath, "index.html");

if (Directory.Exists(clientDistPath))
{
    var fileProvider = new PhysicalFileProvider(clientDistPath);

    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = fileProvider
    });

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = fileProvider
    });

    app.MapFallback(async context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        context.Response.ContentType = "text/html; charset=utf-8";
        await context.Response.SendFileAsync(clientIndexPath);
    });
}
else
{
    app.MapGet("/", () => Results.Text(
        "Frontend build not found. Run `npm run build --prefix client` before hosting through .NET.",
        "text/plain"));
}

app.Run();

static string ResolveClientDistPath(string contentRootPath)
{
    var candidates = new[]
    {
        Path.Combine(contentRootPath, "..", "client", "dist"),
        Path.Combine(contentRootPath, "client", "dist"),
        Path.Combine(contentRootPath, "..", "..", "client", "dist"),
        Path.Combine(AppContext.BaseDirectory, "client", "dist"),
        Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "client", "dist")
    };

    foreach (var candidate in candidates)
    {
        var fullPath = Path.GetFullPath(candidate);
        if (Directory.Exists(fullPath))
        {
            return fullPath;
        }
    }

    return Path.GetFullPath(candidates[0]);
}
