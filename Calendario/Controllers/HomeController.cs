using System.Web.Mvc;

namespace Calendario.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CalendarMes(int ano,int mes)
        {
            return PartialView("_CalendarMes", new[] {ano, mes});
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}