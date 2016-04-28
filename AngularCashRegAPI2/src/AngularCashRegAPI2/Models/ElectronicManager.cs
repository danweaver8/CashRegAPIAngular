using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class ElectronicManager
    {
        readonly List<Product> _electronicItems = new List<Product>()
        {
             new Product  { code= "00006", price=500.00m, name="LED TV" },
             new Product  { code= "00007", price=1000.00m, name="Laptop" },
             new Product  { code= "00008", price=100.00m, name="SSD" },
             new Product  { code= "00009", price=250.00m, name="iPod" },
             new Product  { code= "00010", price=150.00m, name="LED Monitor" }
        };
        public IEnumerable<Product> GetAll { get { return _electronicItems; } }

        public Product GetElectronicByCode(string Code)
        {
            return _electronicItems.Find(o => o.code == Code);
        }
        public Product GetElectronicItemByName(string Name)
        {
            return _electronicItems.Find(o => o.name == Name);
        }
    }
}
