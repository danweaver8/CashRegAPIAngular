using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class KitchenManager
    {
        readonly List<Product> _kitchenItems = new List<Product>()
        {
             new Product  { code= "00016", price=10.00m, name="Mixing Spoon", url=string.Empty},
             new Product  { code= "00017", price=20.00m, name="Cutting Board", url=string.Empty},
             new Product  { code= "00018", price=15.00m, name="Utensil Holder", url=string.Empty}
        };
        public IEnumerable<Product> GetAll { get { return _kitchenItems; } }

        public Product GetKitchenItemByCode(string Code)
        {
            return _kitchenItems.Find(o => o.code == Code);
        }

        public Product GetKitchenItemByName(string Name)
        {
            return _kitchenItems.Find(o => o.name == Name);
        }
    }
}
