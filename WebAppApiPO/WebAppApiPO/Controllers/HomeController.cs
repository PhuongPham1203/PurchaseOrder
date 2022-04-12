using Microsoft.AspNetCore.Mvc;

namespace WebAppApiPO.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
