
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ReadMindMe.API.Controllers;

[AllowAnonymous]
public class FallbackController : Controller
{
    private readonly ILogger<FallbackController> _logger;

    public FallbackController(ILogger<FallbackController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }


}
