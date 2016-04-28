using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class ClothingManager
    {
        readonly List<Product> _clothingItems = new List<Product>()
        { 
             new Product  { code= "00011", price=20.00m, name="Shirt" },
             new Product  { code= "00012", price=50.00m, name="Pants" },
             new Product  { code= "00013", price=25.00m, name="Belt" },
             new Product  { code= "00014", price=70.00m, name="Shoes" },
             new Product  { code= "00015", price=10.00m, name="Socks" }
        };
        public IEnumerable<Product> GetAll { get { return _clothingItems; } }

        public Product GetClothingItemByCode(string Code)
        {
            return _clothingItems.Find(o => o.code == Code);
        }

        public Product GetClothingItemByName(string Name)
        {
            return _clothingItems.Find(o => o.name == Name);
        }
    }
}
