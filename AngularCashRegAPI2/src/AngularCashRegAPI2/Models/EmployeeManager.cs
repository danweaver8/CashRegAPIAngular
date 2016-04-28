using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCashRegAPI2.Models
{
    public class EmployeeManager
    {
        readonly List<Employee> _employees = new List<Employee>() {
            new Employee { code = "1", name = "Bill Gates", discount=20},
            new Employee { code = "2", name ="Steve Jobs", discount=25},
            new Employee { code = "3", name ="Alex Atwell", discount=21},
            new Employee { code = "4", name ="Andre Hyland", discount=23},
            new Employee { code = "5", name ="Romario Bates", discount=20},
            new Employee { code = "6", name ="Kwabena Adu", discount=28},
        };
        public IEnumerable<Employee> GetAll { get { return _employees; } }

        //public Employee GetCategoryByID(int Id)
        //{
        //    return _categories.Find(o => o.ID == Id);
        //}
    }
}
