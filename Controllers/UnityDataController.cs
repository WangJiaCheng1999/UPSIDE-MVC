using System;
using Microsoft.AspNetCore.Mvc;

namespace MvcTest.Controllers
{
    public class UnityDataController : Controller
    {
        [HttpGet]
        public void UnityDataGetter(string jsonData)
        {   
            string path = "wwwroot/JData";
            int fileNumber = System.IO.Directory.GetFiles(path).Length + 1; 
            string pathString = "wwwroot/JData/Round" + fileNumber + ".json";
            Console.WriteLine(pathString);
            Console.WriteLine(jsonData);
            if (!System.IO.File.Exists(pathString))
            {
                System.IO.File.WriteAllText(pathString, jsonData);
            }
            else
            {
                Console.WriteLine("File \"{0}\" already exists.",pathString);
            }
        }
        
        
    }
}