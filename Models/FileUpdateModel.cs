using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MvcTest.Models
{
 
    public static class IFormFileExtensions
    {
        //get the file name 
        public static string GetFilename(this IFormFile file)
        {
            return ContentDispositionHeaderValue.Parse(
                file.ContentDisposition).FileName.ToString().Trim('"');
        }
        // copy the file from selected to upload file 
        public static MemoryStream GetFileStream(this IFormFile file)
        {
            MemoryStream filestream = new MemoryStream();
             file.CopyToAsync(filestream);
            return filestream;
        }

        public static byte[] GetFileArray(this IFormFile file)
        {
            MemoryStream filestream = new MemoryStream();
            file.CopyToAsync(filestream);
            return filestream.ToArray();
        }
    }
    
    public class FileInputModel
    {
        public IFormFile FileToUpload { get; set; }
    }
}
