using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
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
        private readonly IFileProvider fileProvider;

        //Display the Update Experiment data from file
        public IActionResult UpdateExperiment() 
        {
            var model = new FilesViewModel();
            int i = 0;
            foreach (var item in this.fileProvider.GetDirectoryContents(""))
            {
                i++;
                model.Files.Add(
                    new FileDetails {Id=i, Name = item.Name, Path = item.PhysicalPath });
            }
            return View(model);

        }

        public HomeController(IFileProvider fileProvider)
        {
            this.fileProvider = fileProvider;
        }

        [HttpPost]
        //add the selected data into JData
        public IActionResult UploadFiles(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return Content("files not selected");
            
            foreach (var file in files)
            {
                var path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/JData",
                        file.GetFilename());
                var types = GetMimeTypes();
                string typeJudge = types[".json"];
                if (GetContentType(path) == typeJudge)
                {
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyToAsync(stream);
                    }
                }
                else {
                    TempData["msg"] = "<script>alert('Only update the experiments json file');</script>";
                }
               
            }

            return RedirectToAction("UpdateExperiment");
        }
        //get the all files from location
        public IActionResult Files()
        {

            var model = new FilesViewModel();
            foreach (var item in this.fileProvider.GetDirectoryContents("wwwroot/JData"))
            {
                model.Files.Add(
                    new FileDetails { Name = item.Name, Path = item.PhysicalPath });
            }
            return View(model);

        }
        //can download the file from the sever
        public IActionResult Download(string filename)
        {
            if (filename == null)
                return Content("filename not present");
            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot/JData", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                 stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }
        //delete the selected file
        public IActionResult Delete(string filename)
        {
            if (filename == null)
                return Content("filename not present");
            else {
               
                
                var path = Path.Combine(
                          Directory.GetCurrentDirectory(),
                          "wwwroot/JData", filename);
                System.IO.File.Delete(path);              

                TempData["msg"] = "<script>alert('Success delete the file');</script>"; //return alert 
            }
           
           
            return RedirectToAction("UpdateExperiment");

        }
        //get the file type
        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
          
                return types[ext];          
        }

      

        //limit the download file type
        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                { ".json","text/json"},
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"},

            };
        }
    
    //Open Unity application
    public IActionResult OpenUnity()
        { 
            //Process.Start("C:/Users/Administrator/Desktop/UnityExperiment/UnityExperiment.exe");
           Process.Start("wwwroot/UnityExperiment/UnityExperiment.exe");
            
            return RedirectToAction("IntroView");
        }

        //error pages
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


   

    }
    //List<DataFromSQL> dateFromSQLs = new List<DataFromSQL>();
    //public HomeController(IConfiguration config)
    //{
    //    this.configuration = config;
    //}
    //private readonly IConfiguration configuration;

    // Display the stored SQLSERVER data 
    //public IActionResult Index()
    //{
    //    FetchDate();
    //    return View(dateFromSQLs);
    //}
    // get the data from SQL SERVER
    //private void FetchDate()
    //{
    //    try
    //    {
    //        string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
    //        SqlConnection connection = new SqlConnection(connectionstring);
    //        connection.Open();
    //        //SqlCommand com = new SqlCommand("Select count(*) from EmployeeDetails", connection);
    //        SqlCommand com = new SqlCommand("SELECT TOP (1000) [Round],[Success],[OverTime],[TimeUse],[ImageType],[ImageDetail] FROM [UPSIDEDb].[dbo].[Experiments]", connection);
    //        //var count = (int)com.ExecuteScalar();
    //        //ViewData["TotalData"] = count;
    //        SqlDataReader reader;
    //        reader = com.ExecuteReader();
    //        while (reader.Read())
    //        {
    //            dateFromSQLs.Add(new DataFromSQL() { Round = reader["Round"].ToString(), Success = reader["Success"].ToString(), OverTime = reader["OverTime"].ToString(), TimeUse = reader["TimeUse"].ToString(), ImageType = reader["ImageType"].ToString(), ImageDetail = reader["ImageDetail"].ToString(), });
    //        }
    //        connection.Close();
    //    }
    //    catch (Exception ex)
    //    {
    //        throw ex;

    //    }

    //}

}
