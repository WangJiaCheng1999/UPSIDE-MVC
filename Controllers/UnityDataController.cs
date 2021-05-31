using System;
using Microsoft.AspNetCore.Mvc;

namespace MvcTest.Controllers
{
    public class UnityDataController : Controller
    {
        [HttpGet]
        public void UnityDataGetter(string jsonData)
        {
            Console.WriteLine(jsonData);
        }
        
        
    }
}