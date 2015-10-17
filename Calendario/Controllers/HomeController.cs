using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Calendario.ViewModel;

namespace Calendario.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var list = new List<SalaAulaViewModel>
            {
                new SalaAulaViewModel
                {
                    Nome = "Sala 1",
                    Imagem = "http://www.akytudo.com.br/imagens/placa-preta.png",
                    Agenda = new List<AgendaDiaViewModel>
                    {
                        new AgendaDiaViewModel
                        {
                            Descricao = "Aula de Matematica fslksnfl sdflk nd oj sod",
                            Horario = new DateTime(2015, 1, 1, 8, 10, 0),
                            Professor = "Gustavo Maritan"
                        },
                        new AgendaDiaViewModel
                        {
                            Descricao = "Aula de Informatica",
                            Horario = new DateTime(2015, 1, 1, 9, 5, 0),
                            Professor = "Gustavo Maritan"
                        },
                        new AgendaDiaViewModel
                        {
                            Descricao = "Aula de Portugues",
                            Horario = new DateTime(2015, 1, 1, 8, 40, 0),
                            Professor = "Gustavo Maritan"
                        }
                    }
                }
            };


            return View(list);
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