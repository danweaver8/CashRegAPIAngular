using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularCashRegAPI2.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularCashRegAPI2.Controllers
{
    [Route("api/[controller]")]
    public class KitchenController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            KitchenManager kitchenItems = new KitchenManager();
            return kitchenItems.GetAll;
        }

        // GET api/values/7
        [HttpGet("{id}")]
        public Product Get(string code)
        {
            KitchenManager Cats = new KitchenManager();
            return Cats.GetKitchenItemByCode(code);
        }
    }
}
