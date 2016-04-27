using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class CategoryManager
    {
        readonly List<Category> _categories = new List<Category>() {
            new Category { ID = 1, Name = "Kitchen"},
            new Category { ID = 2, Name ="Electronic"},
            new Category { ID = 3, Name ="Grocery"},
            new Category { ID = 4, Name ="Clothing"},
        };
        public IEnumerable<Category> GetAll { get { return _categories; } }

        //public List<DOTAHero> GetHeroesByType(string type)
        //{
        //    return _heroes.Where(o => o.Type.ToLower().Equals(type.ToLower())).ToList();
        //}
        public Category GetCategoryByID(int Id)
        {
            return _categories.Find(o => o.ID == Id);
        }
    }
}
