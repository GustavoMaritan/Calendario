using System;
using System.Collections.Generic;

namespace Calendario.ViewModel
{
    public class AgendaDiaViewModel
    {
        public DateTime Horario { get; set; }
        public string Descricao { get; set;}
        public string Professor { get; set; }
    }

    public class SalaAulaViewModel
    {
        public string Nome { get; set; }
        public string Imagem { get; set; }
        public List<AgendaDiaViewModel> Agenda { get; set; }
    }
}