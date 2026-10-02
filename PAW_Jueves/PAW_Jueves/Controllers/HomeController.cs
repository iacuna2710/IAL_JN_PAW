using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace PAW_Jueves.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
