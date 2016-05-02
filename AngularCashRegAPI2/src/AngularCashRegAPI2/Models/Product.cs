using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class Product
    {
        public string code { get; set; }
        public decimal price { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }
}
