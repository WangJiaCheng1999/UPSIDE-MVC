using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MvcTest.Models;

namespace MvcTest.Controllers
{
    public class HomeController : Controller
    {


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult DataPage()
        {
            return View();
        }

        public IActionResult IntroView()
        {
    
            return View();
        }

        public IActionResult RawData()
        {
            return View();
        }

        public IActionResult OverallPage()
        {
            return View();
        }
        public IActionResult UpdateExperiment()
        {
            return View();
        }
        //Open Unity application
        public IActionResult OpenUnity()
        {
            Process.Start("C:/Users/Administrator/Desktop/UnityExperiment/UnityExperiment.exe");
            
            return RedirectToAction("Index");
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
