using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MvcTest.Models
{
    public class ExperimentModel
    {
        public int Round { get; set; }
        public bool Success { get; set; }
        public bool OverTime { get; set; }
        public int TimeUse { get; set; }
        public string ImageType { get; set; }
        public string ImageDetail { get; set; }
    }
}
