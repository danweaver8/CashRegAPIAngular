﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AngularCashRegAPI2.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularCashRegAPI2.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            CategoryManager Cats = new CategoryManager();
            return Cats.GetAll;
        }

        // GET api/values/7
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            CategoryManager Cats = new CategoryManager();
            return Cats.GetCategoryByID(id);
        }

        // POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
