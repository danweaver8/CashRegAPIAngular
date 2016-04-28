using AngularCashRegAPI2.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Controllers
{
    [Route("api/[controller]")]
    public class ElectronicController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            ElectronicManager electronicItems = new ElectronicManager();
            return electronicItems.GetAll;
        }

        // GET api/values/7
        [HttpGet("{id}")]
        public Product Get(string code)
        {
            ElectronicManager Cats = new ElectronicManager();
            return Cats.GetElectronicByCode(code);
        }
    }
}
