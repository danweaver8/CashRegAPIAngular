using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class GroceryManager
    {

        readonly List<Product> _groceryItems = new List<Product>()
        {
             new Product  { code= "00001", price=2.00m, name="Oranges", url=string.Empty},
             new Product  { code= "00002", price=5.35m, name="Bananas", url=string.Empty},
             new Product  { code= "00003", price=1.05m, name="Mangos", url=string.Empty},
             new Product  { code= "00004", price=3.50m, name="Pretzels", url=string.Empty}
        };
        public IEnumerable<Product> GetAll { get { return _groceryItems; } }

        public Product GetGroceryItemByCode(string Code)
        {
            return _groceryItems.Find(o => o.code == Code);
        }

        public Product GetGroceryItemByName(string Name)
        {
            return _groceryItems.Find(o => o.name == Name);
        }
    }
}
