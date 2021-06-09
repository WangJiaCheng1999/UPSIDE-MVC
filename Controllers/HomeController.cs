using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MvcTest.Models;
using StateManagement.Models;

namespace MvcTest.Controllers
{
    public class HomeController : Controller
    {
        string getUnityLocation;
        public object ScriptManager { get; private set; }

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
      
        public IActionResult Configration()
        {
            //string uname = txt["u_name"];
            StudentModel _studentModel = new StudentModel();
            return View();
        }
        [HttpPost]
        public IActionResult Configration(string StudentName)
        {
           string UnityLocation = StudentName;
            getUnityLocation = UnityLocation;
            Console.WriteLine(StudentName);
            return View();
           
        }
        //Open Unity application
        
        public IActionResult OpenUnity()
        {

           
            Process.Start("D:\\Unity\\UnityExperiment.exe");
            return RedirectToAction("IntroView");


        }
        
        [HttpPost]
     


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

    
}
